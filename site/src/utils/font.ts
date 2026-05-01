import type { ResumeStyles } from "~/composables/stores/style";

export class FontsService {
  /**
   * Notify when the fonts used in the resume styles are loaded
   *
   * @param styles Resume styles
   * @see {@link observer}
   */
  public presetObserver(styles: ResumeStyles) {
    const fonts = [
      styles.fontEN.fontFamily || styles.fontEN.name,
      styles.fontCJK.fontFamily || styles.fontCJK.name
    ];

    const observers = [];

    for (const font of fonts) observers.push(document.fonts.load(`12px ${font}`));

    return Promise.all(observers);
  }
}

export const fontsService = new FontsService();
