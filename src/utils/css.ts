import { createGenerator, noop } from "@unocss/core"
import type { UnoGenerator, UnocssPluginContext } from "@unocss/core"
import transformerDirectives from "@unocss/transformer-directives"
import MagicString from "magic-string"
import { presetWind4 } from "unocss/preset-wind4"

import { useConstant } from "@/composables/constant"
import type { DocumentStyles } from "@/composables/stores/style"

const sheetsMap = new Map<string, HTMLStyleElement>()

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
  let style = sheetsMap.get(id)

  if (!style) {
    style = document.createElement("style")

    style.setAttribute("type", "text/css")
    style.setAttribute("data-dynamic-css-id", id)
    style.textContent = content

    document.head.appendChild(style)
  } else {
    style.textContent = content
  }

  sheetsMap.set(id, style)
}

let _generator: UnoGenerator | undefined

export const getUnoGenerator = async (): Promise<UnoGenerator> => {
  if (_generator) return _generator
  _generator = await createGenerator({ presets: [presetWind4()] })
  return _generator
}

/**
 * Transform UnoCSS directives in a CSS string.
 * Supports `@apply`, `--at-apply`, `@screen`, and theme functions.
 * @param css - The input CSS string containing UnoCSS directives.
 */
export const applyUno = async (css: string): Promise<string> => {
  const uno = await getUnoGenerator()
  const ctx = { uno, invalidate: noop } as UnocssPluginContext

  const code = new MagicString(css)
  const transformer = transformerDirectives()
  await transformer.transform(code, "style.css", ctx)
  const transformed = code.toString()

  const result = await ctx.uno.generate(transformed, {
    // We don't need generate preflight, because the preflight is included by `theme: true` in unocss.config.ts.
    preflights: false,
  })

  return transformed + "\n" + result.css
}

/**
 * Service for injecting dynamic CSS into the document.
 *
 * Note: This service will not handle margins, height and width, which should be
 * handled by the `vue-smart-pages` package.
 */
export class DynamicCssService {
  private injectedCssId = (type: string) => {
    return `ohmycv-${type}-preview`
  }

  private fontFamily = (selector: string, styles: DocumentStyles) => {
    const fontEN = styles.fontEN.fontFamily || styles.fontEN.name
    const fontCJK = styles.fontCJK.fontFamily || styles.fontCJK.name
    return `${selector} { font-family: ${fontEN}, ${fontCJK}, Arial, Helvetica, sans-serif; }`
  }

  private paperSize = (styles: DocumentStyles) => {
    return `@media print { @page { size: ${styles.paper}; } }`
  }

  /**
   * Inject CSS that controlled by the toolbar into the document.
   *
   * @param styles Document styles
   */
  public async injectToolbar(styles: DocumentStyles) {
    const { RENDER } = useConstant()
    const css =
      this.fontFamily(RENDER.PREVIEW_SELECTOR, styles) +
      // We only need to set paper size for the preview view in the editor
      this.paperSize(styles)

    injectCss(this.injectedCssId("toolbar"), css)
  }

  /**
   * Inject CSS from the CSS editor into the document.
   * UnoCSS directives (e.g. `@apply`) are resolved before injection.
   *
   * @param css CSS string
   */
  public async injectCssEditor(css: string) {
    const transformed = await applyUno(css)
    injectCss(this.injectedCssId("css-editor"), transformed)
  }

  /**
   * Generate CSS from markdown content and inject it into the document.
   *
   * @param markdown A string of markdown content.
   */
  public async injectMarkdown(markdown: string) {
    const uno = await getUnoGenerator()
    const result = await uno.generate(markdown, {
      preflights: false,
    })
    injectCss(this.injectedCssId("markdown"), result.css)
  }
}

export const dynamicCssService = new DynamicCssService()
