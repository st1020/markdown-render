import { defineStore } from "pinia";
import { reactive } from "vue";
import { useMonaco } from "~/composables/monaco";
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

  const setData = <T extends keyof SystemData>(key: T, value: SystemData[T]) => {
    data[key] = value;
    if (key === "css") dynamicCssService.injectCssEditor(value as string);
  };

  const setAndSyncToMonaco = (key: "markdown" | "css", value: string) => {
    setData(key, value);

    const { setContent } = useMonaco();
    setContent(key, value);
  };

  return {
    data,
    setData,
    setAndSyncToMonaco
  };
});
