<script setup lang="ts">
import { watchThrottled } from "@vueuse/core"
import { computed, ref } from "vue"

import { useConstant } from "~/composables/constant"
import { useSmartPages } from "~/composables/pages"
import type { DocumentStyles } from "~/composables/stores/style"
import { fontsService } from "~/utils/font"
import { markdownService } from "~/utils/markdown"

const props = defineProps<{
  id: string | number
  markdown: string
  css?: string
  styles: DocumentStyles
}>()

const constant = useConstant()
const target = ref<HTMLElement>()

const size = computed(() => ({
  height: constant.PAPER.sizeToPx(props.styles.paper, "h"),
  width: constant.PAPER.SIZES[props.styles.paper].w,
}))
const margins = computed(() => ({
  top: props.styles.marginV,
  bottom: Math.max(props.styles.marginV - 10, constant.RENDER.PRINT_BOTTOM),
  left: props.styles.marginH,
  right: props.styles.marginH,
}))
const html = computed(() => markdownService.renderDocument(props.markdown))

const { render } = useSmartPages(target, html, size, margins, {
  beforeRender: async () => {
    // Wait for the fonts to be loaded
    await fontsService.presetObserver(props.styles)
  },
  watchThrottledOptions: {
    throttle: 200,
  },
})

watchThrottled(() => [props.css, props.styles.fontCJK, props.styles.fontEN], render, {
  throttle: 200,
  leading: false,
})

defineExpose({ render })
</script>

<template>
  <div class="document-render" :id="`document-${id}`" ref="target" />
</template>
