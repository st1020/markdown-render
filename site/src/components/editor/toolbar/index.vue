<template>
  <div
    id="toolbar"
    class="pane-container overflow-y-scroll hide-scrollbar bg-background w-62 mr-3 lt-lg:bg-accent lt-lg:rounded-none"
  >
    <template v-for="(tool, i) in tools" :key="tool.id">
      <component :is="tool.component" :id="`toolbar-${tool.id}`" />
      <Separator v-if="i < tools.length - 1" class="w-[calc(100%-32px)] mx-auto" />
    </template>
  </div>
</template>

<script setup lang="ts">
import Separator from "~/components/ui/separator/Separator.vue";
import EditorToolbarFile from "./file/index.vue";
import EditorToolbarFontFamily from "./FontFamily.vue";
import EditorToolbarMargins from "./Margins.vue";
import EditorToolbarPaper from "./Paper.vue";

const tools = [
  { id: "file", component: EditorToolbarFile },
  { id: "paper_size", component: EditorToolbarPaper },
  { id: "font_family", component: EditorToolbarFontFamily },
  { id: "margins", component: EditorToolbarMargins }
];
</script>
