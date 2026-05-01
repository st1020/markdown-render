import MarkdownIt from "markdown-it";
import type {
  PluginSimple,
  PluginWithOptions,
  Options as MarkdownItOptions
} from "markdown-it";
// @ts-expect-error missing types
import MarkdownItDeflist from "markdown-it-deflist";
import LinkAttributes from "markdown-it-link-attributes";
import MarkdownItCite from "~/lib/markdown-it-cross-ref";
import MarkdownItLatexCmds from "~/lib/markdown-it-latex-cmds";

type MarkdownItPlugins = Array<
  PluginSimple | PluginWithOptions | [PluginWithOptions, any]
>;

type MarkdownServiceOptions = {
  readonly plugins?: MarkdownItPlugins;
  readonly options?: MarkdownItOptions;
};

export class MarkdownService {
  private _md: MarkdownIt;

  constructor(opt: MarkdownServiceOptions = {}) {
    this._md = this._setupMarkdownIt(opt);
  }

  private _setupMarkdownIt({ plugins = [], options = {} }: MarkdownServiceOptions) {
    const md = new MarkdownIt(options);

    plugins.forEach((plugin) => {
      if (Array.isArray(plugin)) md.use(...plugin);
      else md.use(plugin);
    });

    return md;
  }

  /**
   * Convert
   *
   *  <dt>...</dt>
   *  <dd>...</dd>
   *  <dt>...</dt>
   *  <dd>...</dd>
   *
   * (this would happen if two deflists are adjacent)
   *
   * to
   *
   * <dl>
   *   <dt>...</dt>
   *   <dd>...</dd>
   * </dl>
   * <dl>
   *   <dt>...</dt>
   *   <dd>...</dd>
   * </dl>
   */
  private _resolveDeflist(html: string) {
    return html.replace(/<dl>([\s\S]*?)<\/dl>/g, (match) =>
      match.replace(/<\/dd>\n<dt>/g, "</dd>\n</dl>\n<dl>\n<dt>")
    );
  }

  public renderResume(md: string) {
    return this._resolveDeflist(this._md.render(md));
  }
}

export const markdownService = new MarkdownService({
  plugins: [
    MarkdownItDeflist,
    MarkdownItCite,
    MarkdownItLatexCmds,
    [
      LinkAttributes,
      {
        matcher: (link: string) => /^https?:\/\//.test(link),
        attrs: {
          target: "_blank",
          rel: "noopener"
        }
      }
    ]
  ],
  options: {
    html: true
  }
});
