<script setup lang="ts">
import { reactiveOmit } from "@vueuse/core"
import type { SliderRootEmits, SliderRootProps } from "reka-ui"
import { SliderRange, SliderRoot, SliderThumb, SliderTrack, useForwardPropsEmits } from "reka-ui"
import type { HTMLAttributes } from "vue"

import { cn } from "@/utils/shadcn"

const props = defineProps<SliderRootProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<SliderRootEmits>()

const delegatedProps = reactiveOmit(props, "class")

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <SliderRoot
    :class="
      cn(
        'relative flex w-full touch-none select-none items-center data-[orientation=vertical]:flex-col data-[orientation=vertical]:w-2 data-[orientation=vertical]:h-full',
        props.class,
      )
    "
    v-bind="forwarded"
  >
    <SliderTrack
      class="rounded-full bg-secondary grow h-1 w-full relative overflow-hidden data-[orientation=vertical]:w-2"
    >
      <SliderRange class="bg-primary h-full absolute data-[orientation=vertical]:w-full" />
    </SliderTrack>
    <SliderThumb
      v-for="(_, key) in modelValue"
      :key="key"
      class="group border-2 border-primary rounded-full bg-background h-4 w-4 block ring-offset-background transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <slot name="thumb" :index="key" :value="modelValue?.[key]" />
    </SliderThumb>
  </SliderRoot>
</template>
