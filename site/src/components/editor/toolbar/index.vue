<template>
  <div
    id="toolbar"
    class="pane-container overflow-y-scroll hide-scrollbar bg-background w-62 mr-3"
    lt-lg="bg-accent rounded-none"
  >
    <template v-for="(tool, i) in tools" :key="tool.id">
      <component :is="tool.component" :id="`toolbar-${tool.id}`" />
      <UiSeparator v-if="i < tools.length - 1" class="w-[calc(100%-32px)] mx-auto" />
    </template>
  </div>
</template>

<script setup lang="ts">
import {
  EditorToolbarFile,
  EditorToolbarFontFamily,
  EditorToolbarMargins,
  EditorToolbarPaper
} from "#components";

const tools = [
  {
    id: "file",
    icon: "i-carbon:import-export",
    component: EditorToolbarFile
  },
  {
    id: "paper_size",
    icon: "i-majesticons:paper-fold-line",
    component: EditorToolbarPaper
  },
  {
    id: "font_family",
    icon: "i-material-symbols:font-download-outline",
    component: EditorToolbarFontFamily
  },
  {
    id: "margins",
    icon: "i-radix-icons:margin",
    component: EditorToolbarMargins
  }
];
</script>
