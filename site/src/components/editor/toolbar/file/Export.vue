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

const { data } = useDataStore();
const saveName = computed(() => data.resumeName.trim().replace(/\s+/g, "_"));

// Export as PDF
const exportPDF = () => {
  const title = document.title;

  document.title = saveName.value;
  window.print();
  document.title = title;
};

// Export as Markdown
const exportMd = () => {
  downloadFile(`${saveName.value}.md`, data.markdown);
};
</script>
