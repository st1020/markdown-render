<template>
  <div class="resume-render" :id="`resume-${id}`" ref="target" />
</template>

<script lang="ts" setup>
import { watchThrottled } from "@vueuse/core";
import { computed, ref } from "vue";
import { useConstant } from "~/composables/constant";
import type { ResumeStyles } from "~/composables/stores/style";
import { useSmartPages } from "~/lib/vue-smart-pages";
import { googleFontsService } from "~/utils/font";
import { markdownService } from "~/utils/markdown";

const props = defineProps<{
  id: string | number;
  markdown: string;
  css?: string;
  styles: ResumeStyles;
}>();

const constant = useConstant();
const target = ref<HTMLElement>();

const size = computed(() => ({
  height: constant.PAPER.sizeToPx(props.styles.paper, "h"),
  width: constant.PAPER.SIZES[props.styles.paper].w
}));
const margins = computed(() => ({
  top: props.styles.marginV,
  bottom: Math.max(props.styles.marginV - 10, constant.RENDER.PRINT_BOTTOM),
  left: props.styles.marginH,
  right: props.styles.marginH
}));
const html = computed(() => markdownService.renderResume(props.markdown));

const { render } = useSmartPages(target, html, size, margins, {
  beforeRender: async () => {
    // Wait for the fonts to be loaded
    await googleFontsService.presetObserver(props.styles);
  },
  watchThrottledOptions: {
    throttle: 200
  }
});

watchThrottled(() => [props.css, props.styles.fontCJK, props.styles.fontEN], render, {
  throttle: 200,
  leading: false
});

defineExpose({ render });
</script>
