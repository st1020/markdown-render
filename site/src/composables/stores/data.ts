import { defineStore } from "pinia";
import { reactive } from "vue";
import { dynamicCssService } from "~/utils/css";

export type SystemData = {
  markdown: string;
  css: string;
  loaded: boolean;
};

export const useDataStore = defineStore("data", () => {
  const data = reactive<SystemData>({
    markdown: "",
    css: "",
    loaded: false
  });

  const setData = async <T extends keyof SystemData>(key: T, value: SystemData[T]) => {
    data[key] = value;
    if (key === "css") {
      await dynamicCssService.injectCssEditor(value as string);
    }
  };

  return {
    data,
    setData
  };
});
