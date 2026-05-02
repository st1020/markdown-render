import type { DocumentStyles } from "@/composables/stores/style"

export class FontsService {
  /**
   * Notify when the fonts used in the document styles are loaded
   *
   * @param styles Document styles
   * @see {@link observer}
   */
  public presetObserver(styles: DocumentStyles) {
    const fonts = [
      styles.fontEN.fontFamily || styles.fontEN.name,
      styles.fontCJK.fontFamily || styles.fontCJK.name,
    ]

    const observers = []

    for (const font of fonts) observers.push(document.fonts.load(`12px ${font}`))

    return Promise.all(observers)
  }
}

export const fontsService = new FontsService()
