import type * as Monaco from "monaco-editor";
import { ref, shallowRef } from "vue";
import { useDataStore } from "~/composables/stores/data";

import {
  setupMonaco,
  setupMonacoEditor,
  setupMonacoModel,
  type MonacoModel
} from "./setup";
import {
  setupUnocssCompletion,
  setupUnocssCssOptions,
  setupUnocssDecorations,
  setupUnocssHover
} from "./unocss";

type MonacoStates = {
  editor: Monaco.editor.IStandaloneCodeEditor;
  markdown: MonacoModel;
  css: MonacoModel;
};

const monacoStates = shallowRef<MonacoStates | undefined>(undefined);
const monacoLoading = ref(false);

export const useMonaco = () => {
  const setup = async (container?: HTMLElement) => {
    if (!container) return;

    monacoLoading.value = true;

    try {
      const { monaco } = await setupMonaco();
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

      // Setup UnoCSS features
      setupUnocssCssOptions(monaco);
      setupUnocssCompletion(monaco);
      setupUnocssHover(monaco);
      setupUnocssDecorations(monaco, editor, css.get());

      monacoStates.value = { editor, markdown, css };
    } catch (error) {
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
