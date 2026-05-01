import type { Font, ValidPaperSize } from "./variables";
import * as V from "./variables";

export type { Font, ValidPaperSize };

const CONSTANT = {
  FONT: {
    LOCAL: {
      EN: V.LOCAL_EN_FONTS,
      CJK: V.LOCAL_CJK_FONTS,
      includes: (font: Font) => {
        const check = (list: Font[]) =>
          list.some(
            (item) => (item.fontFamily ?? item.name) === (font.fontFamily ?? font.name)
          );
        return check(V.LOCAL_EN_FONTS) || check(V.LOCAL_CJK_FONTS);
      }
    }
  },
  PAPER: {
    SIZES: V.PAPER_SIZES,
    MM_TO_PX: V.MM_TO_PX,
    sizeToPx: (size: ValidPaperSize, v: "h" | "w") =>
      Math.trunc(V.PAPER_SIZES[size][v] * V.MM_TO_PX)
  },
  RENDER: {
    PRINT_BOTTOM: V.PRINT_BOTTOM,
    PREVIEW_SELECTOR: V.PREVIEW_SELECTOR
  },
  DEFAULT: {
    STYLES: V.DEFAULT_STYLES,
    MD_CONTENT: V.DEFAULT_MD_CONTENT,
    CSS_CONTENT: V.DEFAULT_CSS_CONTENT
  }
};

export const useConstant = () => CONSTANT;
