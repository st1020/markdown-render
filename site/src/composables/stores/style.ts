import { defineStore } from "pinia";
import { reactive } from "vue";
import type { Font, ValidPaperSize } from "~/composables/constant";
import { useConstant } from "~/composables/constant";
import { copy } from "~/lib/utils";
import { dynamicCssService } from "~/utils/css";
import { googleFontsService } from "~/utils/font";

export type ResumeStyles = {
  marginV: number;
  marginH: number;
  fontCJK: Font;
  fontEN: Font;
  paper: ValidPaperSize;
};

export const useStyleStore = defineStore("style", () => {
  const { DEFAULT } = useConstant();
  const styles = reactive<ResumeStyles>(copy(DEFAULT.STYLES));

  const setStyle = async <T extends keyof ResumeStyles>(
    key: T,
    value: ResumeStyles[T]
  ) => {
    // handle Google fonts
    if (["fontCJK", "fontEN"].includes(key)) {
      await googleFontsService.resolve(value as Font);
    }

    // update styles for the current resume
    styles[key] = value;

    // update CSS
    // vue-smart-pages will handle margins, height and width
    if (!["marginV", "marginH"].includes(key)) dynamicCssService.injectToolbar(styles);
  };

  return {
    styles,
    setStyle
  };
});
