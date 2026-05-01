import { useConstant } from "~/composables/constant";
import type { DocumentStyles } from "~/composables/stores/style";

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
  private _injectedCssId = (type: "toolbar" | "css-editor") => {
    return `ohmycv-${type}-preview`;
  };

  private fontFamily = (selector: string, styles: DocumentStyles) => {
    const fontEN = styles.fontEN.fontFamily || styles.fontEN.name;
    const fontCJK = styles.fontCJK.fontFamily || styles.fontCJK.name;
    return `${selector} { font-family: ${fontEN}, ${fontCJK}, Arial, Helvetica, sans-serif; }`;
  };

  private paperSize = (styles: DocumentStyles) => {
    return `@media print { @page { size: ${styles.paper}; } }`;
  };

  /**
   * Inject CSS that controlled by the toolbar into the document.
   *
   * @param styles Document styles
   * @param id Element ID of the corresponding document element (dashboard). If not
   * provided, it will be set to "preview", which is the preview view in the editor.
   */
  public injectToolbar(styles: DocumentStyles) {
    const css =
      this.fontFamily(RENDER.PREVIEW_SELECTOR, styles) +
      // We only need to set paper size for the preview view in the editor
      this.paperSize(styles);

    injectCss(this._injectedCssId("toolbar"), css);
  }

  /**
   * Inject CSS that controlled by the CSS editor into the document.
   *
   * @param css CSS string
   * @param id Element ID of the corresponding document element (dashboard). If not
   * provided, it will be set to "preview", which is the preview view in the editor.
   */
  public injectCssEditor(css: string) {
    injectCss(this._injectedCssId("css-editor"), css);
  }
}

export const dynamicCssService = new DynamicCssService();
