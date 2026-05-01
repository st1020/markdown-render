<template>
  <div
    class="pane-container overflow-scroll hide-scrollbar bg-secondary border-4 border-gray-200"
  >
    <VueZoom ref="zoom" :scale="scale">
      <MarkdownRender
        id="preview"
        :markdown="data.markdown"
        :css="data.css"
        :styles="styles"
      />
    </VueZoom>

    <div
      id="zoom-bar"
      class="hstack fixed bottom-4 ml-2 shadow-c rounded-full overflow-hidden text-primary-foreground bg-blue-500 lg:bottom-auto lg:top-15 lg:opacity-0 lg:hover:opacity-100 lg:focus-within:opacity-100"
    >
      <button @click="scale *= 1.1" aria-label="Zoom in" class="zoom-button">
        <span class="i-lucide:zoom-in" />
      </button>
      <button @click="scale /= 1.1" aria-label="Zoom out" class="zoom-button">
        <span class="i-lucide:zoom-out" />
      </button>
      <button @click="fitWidth" aria-label="Fit width" class="zoom-button">
        <span class="i-fluent:arrow-autofit-width-20-filled" />
      </button>
      <button @click="fitHeight" aria-label="Fit height" class="zoom-button">
        <span class="i-fluent:arrow-autofit-height-20-filled" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useElementSize } from "@vueuse/core";
import { ref, watch } from "vue";
import MarkdownRender from "~/components/editor/MarkdownRender.vue";
import VueZoom from "~/components/editor/VueZoom";
import { useConstant } from "~/composables/constant";
import { useDataStore } from "~/composables/stores/data";
import { useStyleStore } from "~/composables/stores/style";

const scale = ref(1);
const zoom = ref<InstanceType<typeof VueZoom>>();

const { width, height } = useElementSize(zoom);
const { styles } = useStyleStore();
const { data } = useDataStore();
const { PAPER } = useConstant();

const fitWidth = () => {
  scale.value = width.value / PAPER.sizeToPx(styles.paper, "w");
};

const fitHeight = () => {
  scale.value = height.value / PAPER.sizeToPx(styles.paper, "h");
};

watch(width, fitWidth);
</script>
