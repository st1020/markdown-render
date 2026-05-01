<template>
  <div class="flex w-72 h-full">
    <div
      id="toolbar"
      class="pane-container overflow-y-scroll hide-scrollbar bg-background"
      lt-lg="bg-accent rounded-none"
    >
      <template v-for="(tool, i) in tools" :key="tool.id">
        <component :is="tool.component" :id="`toolbar-${tool.id}`" />
        <UiSeparator v-if="i < tools.length - 1" class="w-[calc(100%-32px)] mx-auto" />
      </template>
    </div>

    <div flex="center col none gap-1" border="l dashed lg:none" w-10 bg-accent>
      <template v-for="tool in tools" :key="tool.id">
        <UiButton
          size="round"
          variant="ghost-secondary"
          @click="scrollTo(tool.id)"
          :aria-label="getTooltip(tool.id)"
        >
          <span :class="[tool.icon, ' size-4']" />
        </UiButton>
      </template>
    </div>
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

const scrollTo = (id: string) => {
  const toolbar = document.querySelector<HTMLElement>("#toolbar");
  const section = document.querySelector<HTMLElement>(`#toolbar-${id}`);

  if (!toolbar || !section) return;

  toolbar.scrollTo({
    // offsetTop - header height
    top: section.offsetTop - 48,
    behavior: "smooth"
  });
};

const tooltips: Record<string, string> = {
  file: "File",
  paper_size: "Paper Size",
  font_family: "Font Family",
  margins: "Margins"
};

const getTooltip = (id: string) => tooltips[id] || id;
</script>
