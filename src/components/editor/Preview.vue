<script setup lang="ts">
import { useElementSize } from "@vueuse/core"
import { ref, watch } from "vue"

import MarkdownRender from "@/components/editor/MarkdownRender.vue"
import VueZoom from "@/components/editor/VueZoom"
import { useConstant } from "@/composables/constant"
import { useDataStore } from "@/composables/stores/data"
import { useStyleStore } from "@/composables/stores/style"

const scale = ref(1)
const zoom = ref<InstanceType<typeof VueZoom>>()

const { width, height } = useElementSize(zoom)
const { styles } = useStyleStore()
const { data } = useDataStore()
const { PAPER } = useConstant()

const fitWidth = () => {
  scale.value = width.value / PAPER.sizeToPx(styles.paper, "w")
}

const fitHeight = () => {
  scale.value = height.value / PAPER.sizeToPx(styles.paper, "h")
}

watch(width, fitWidth)
</script>

<template>
  <div class="hide-scrollbar border-4 border-secondary pane-container bg-secondary overflow-scroll">
    <VueZoom ref="zoom" :scale="scale">
      <MarkdownRender id="preview" :markdown="data.markdown" :css="data.css" :styles="styles" />
    </VueZoom>

    <div
      id="zoom-bar"
      class="text-primary-foreground ml-2 rounded-full bg-blue-500 hstack shadow-c bottom-4 fixed overflow-hidden lg:opacity-0 lg:bottom-auto lg:top-15 lg:focus-within:opacity-100 lg:hover:opacity-100"
    >
      <button aria-label="Zoom in" class="zoom-button" @click="scale *= 1.1">
        <span class="i-lucide:zoom-in" />
      </button>
      <button aria-label="Zoom out" class="zoom-button" @click="scale /= 1.1">
        <span class="i-lucide:zoom-out" />
      </button>
      <button aria-label="Fit width" class="zoom-button" @click="fitWidth">
        <span class="i-fluent:arrow-autofit-width-20-filled" />
      </button>
      <button aria-label="Fit height" class="zoom-button" @click="fitHeight">
        <span class="i-fluent:arrow-autofit-height-20-filled" />
      </button>
    </div>
  </div>
</template>
