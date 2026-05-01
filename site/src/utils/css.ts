import { useConstant } from "~/composables/constant";
import type { ResumeStyles } from "~/composables/stores/style";

const sheetsMap = new Map<string, HTMLStyleElement>();

/**
 * Dynamically injects CSS into the document. Borrowed from Vite:
 * https://github.com/vitejs/vite/blob/main/packages/vite/src/client/client.ts
 *
 * This used to be implemented using constructable stylesheets, but that was abandoned
 * due to low performance, see https://github.com/vitejs/vite/pull/11818.
 *
 * @param id To make sure the CSS won't override each other.
 * @param content A string of CSS to inject.
 */
const injectCss = (id: string, content: string) => {
  let style = sheetsMap.get(id);

  if (!style) {
    style = document.createElement("style");

    style.setAttribute("type", "text/css");
    style.setAttribute("data-dynamic-css-id", id);
    style.textContent = content;

    document.head.appendChild(style);
  } else {
    style.textContent = content;
  }

  sheetsMap.set(id, style);
};

const { RENDER } = useConstant();

/**
 * Service for injecting dynamic CSS into the document.
 *
 * Note: This service will not handle margins, height and width, which should be
 * handled by the `vue-smart-pages` package.
 */
export class DynamicCssService {
  constructor() {}

  private _selector = (id?: string | number) => {
    return `#resume-${id ?? RENDER.PREVIEW_ID}`;
  };

  private _injectedCssId = (type: "toolbar" | "css-editor", id?: string | number) => {
    return `ohmycv-${type}-${id ?? RENDER.PREVIEW_ID}`;
  };

  private fontFamily = (selector: string, styles: ResumeStyles) => {
    const fontEN = styles.fontEN.fontFamily || styles.fontEN.name;
    const fontCJK = styles.fontCJK.fontFamily || styles.fontCJK.name;
    return `${selector} { font-family: ${fontEN}, ${fontCJK}, Arial, Helvetica, sans-serif; }`;
  };

  private paperSize = (styles: ResumeStyles) => {
    return `@media print { @page { size: ${styles.paper}; } }`;
  };

  /**
   * Inject CSS that controlled by the toolbar into the document.
   *
   * @param styles Resume styles
   * @param id Element ID of the corresponding resume element (dashboard). If not
   * provided, it will be set to "preview", which is the preview view in the editor.
   */
  public injectToolbar(styles: ResumeStyles, id?: string | number) {
    const selector = this._selector(id);

    const css =
      this.fontFamily(selector, styles) +
      // We only need to set paper size for the preview view in the editor
      (id === undefined ? this.paperSize(styles) : "");

    injectCss(this._injectedCssId("toolbar", id), css);
  }

  /**
   * Inject CSS that controlled by the CSS editor into the document.
   *
   * @param css CSS string
   * @param id Element ID of the corresponding resume element (dashboard). If not
   * provided, it will be set to "preview", which is the preview view in the editor.
   */
  public injectCssEditor(css: string, id?: string | number) {
    if (id !== undefined) {
      // To control each resume element (dashboard) separately
      css = css.replaceAll(RENDER.PREVIEW_SELECTOR, this._selector(id));
    }

    injectCss(this._injectedCssId("css-editor", id), css);
  }
}

export const dynamicCssService = new DynamicCssService();
