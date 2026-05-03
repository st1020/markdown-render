<script setup lang="ts">
import type { SliderRootEmits, SliderRootProps } from "reka-ui"
import { useForwardPropsEmits } from "reka-ui"
import { computed } from "vue"

import { Slider } from "@/components/ui/slider"

const props = defineProps<SliderRootProps & { unit?: string }>()
const emits = defineEmits<SliderRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)

const min = computed(() => props.min ?? 0)
const max = computed(() => props.max ?? 100)
const unit = computed(() => props.unit ?? "")
</script>

<template>
  <Slider class="py-2" v-bind="forwarded">
    <template #thumb="{ value }">
      <span
        class="text-xs text-white p-1 text-center rounded bg-primary min-w-6 hidden left-1/2 absolute after:(mx-auto border-5 border-transparent border-t-primary size-0 content-[''] inset-x-0 top-full absolute) group-focus-visible:block group-hover:block -translate-x-2/4 -translate-y-full -top-2"
      >
        {{ value }}
      </span>
    </template>
  </Slider>

  <div class="text-muted-foreground flex justify-between">
    <span>{{ min }}{{ unit }}</span>
    <span>{{ max }}{{ unit }}</span>
  </div>
</template>
