<script setup lang="ts">
import Combobox from "@/components/common/Combobox.vue"
import type { ValidPaperSize } from "@/composables/constant"
import { useConstant } from "@/composables/constant"
import { useStyleStore } from "@/composables/stores/style"

import EditorToolbarBox from "./Box.vue"

const { styles, setStyle } = useStyleStore()
const { PAPER } = useConstant()

const items = Object.keys(PAPER.SIZES).map((paper) => ({
  label: paper,
  value: paper,
  onSelect: () => setStyle("paper", paper as ValidPaperSize),
}))
</script>

<template>
  <EditorToolbarBox text="Paper Size" icon="i-majesticons:paper-fold-line">
    <Combobox id="paper-size" class="capitalize" :items="items" :default-value="styles.paper" />
  </EditorToolbarBox>
</template>
