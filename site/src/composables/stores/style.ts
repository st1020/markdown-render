import { defineStore } from "pinia";
import { reactive } from "vue";
import type { Font, ValidPaperSize } from "~/composables/constant";
import { useConstant } from "~/composables/constant";
import { dynamicCssService } from "~/utils/css";

export type DocumentStyles = {
  marginV: number;
  marginH: number;
  fontCJK: Font;
  fontEN: Font;
  paper: ValidPaperSize;
};
export const isObject = (v: any) => toString.call(v) === "[object Object]";

const copy = <T>(obj: T): T => {
  if (isObject(obj)) return JSON.parse(JSON.stringify(obj));
  throw new Error("Input must be a non-null object.");
};

export const useStyleStore = defineStore("style", () => {
  const { DEFAULT } = useConstant();
  const styles = reactive<DocumentStyles>(copy(DEFAULT.STYLES));

  const setStyle = async <T extends keyof DocumentStyles>(
    key: T,
    value: DocumentStyles[T]
  ) => {
    // update styles for the current document
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
