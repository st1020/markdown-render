<template>
  <UiButton
    class="gap-x-1.5 w-full h-8 justify-start"
    variant="ghost"
    size="sm"
    @click="exportPDF"
  >
    <span i-mdi:file-pdf text-base />
    Export PDF
  </UiButton>

  <UiButton
    class="gap-x-1.5 w-full h-8 justify-start"
    variant="ghost"
    size="sm"
    @click="exportMd"
  >
    <span i-ri:markdown-fill text-base />
    Export Markdown
  </UiButton>
</template>

<script lang="ts" setup>
import { downloadFile } from "~/lib/utils";
import { useDataStore } from "~/composables/stores/data";
import UiButton from "~/components/ui/button/Button.vue";

const { data } = useDataStore();

const exportPDF = () => {
  const title = document.title;
  document.title = "Resume";
  window.print();
  document.title = title;
};

const exportMd = () => {
  downloadFile("Resume.md", data.markdown);
};
</script>
