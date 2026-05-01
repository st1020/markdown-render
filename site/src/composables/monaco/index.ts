import type * as Monaco from "monaco-editor";
import { ref, shallowRef } from "vue";
import { useDataStore } from "~/composables/stores/data";
import { isClient } from "~/lib/utils";
import { setupMonacoEditor, setupMonacoModel, type MonacoModel } from "./setup";

type MonacoStates = {
  editor: Monaco.editor.IStandaloneCodeEditor;
  markdown: MonacoModel;
  css: MonacoModel;
};

const monacoStates = shallowRef<MonacoStates | undefined>(undefined);
const monacoLoading = ref(false);

export const useMonaco = () => {
  const setup = async (container?: HTMLElement) => {
    if (!isClient || !container) return;

    monacoLoading.value = true;

    try {
      const { editor } = await setupMonacoEditor(container);
      const { data, setData } = useDataStore();

      // Markdown model
      const markdown = await setupMonacoModel("markdown", data.markdown, () =>
        setData("markdown", markdown.get().getValue())
      );

      // CSS model
      const css = await setupMonacoModel("css", data.css, () =>
        setData("css", css.get().getValue())
      );

      monacoStates.value = { editor, markdown, css };
    } catch (error) {
      // TODO: use toast to show error
      console.error("Failed to initialize the editor: ", error);
    } finally {
      monacoLoading.value = false;
    }
  };

  const dispose = () => {
    monacoStates.value?.editor.dispose();
    monacoStates.value?.markdown.dispose();
    monacoStates.value?.css.dispose();

    monacoStates.value = undefined;
    monacoLoading.value = false;
  };

  const activateModel = (model: "markdown" | "css") => {
    monacoStates.value?.editor.setModel(monacoStates.value[model].get());
  };

  const setContent = (model: "markdown" | "css", content: string) => {
    monacoStates.value?.[model].get().setValue(content);
  };

  return {
    setup,
    dispose,
    activateModel,
    setContent,
    loading: monacoLoading
  };
};
