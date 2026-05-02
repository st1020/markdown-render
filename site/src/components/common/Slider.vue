<template>
  <Slider class="py-2" v-bind="forwarded">
    <template #thumb="{ value }">
      <span
        class="hidden group-hover:block group-focus-visible:block p-1 min-w-6 rounded bg-primary absolute -top-2 left-1/2 -translate-x-2/4 -translate-y-full after:(absolute content-[''] size-0 border-5 border-transparent border-t-primary top-full inset-x-0 mx-auto) text-white text-xs text-center"
      >
        {{ value }}
      </span>
    </template>
  </Slider>

  <div class="flex justify-between text-muted-foreground">
    <span>{{ min }}{{ unit }}</span>
    <span>{{ max }}{{ unit }}</span>
  </div>
</template>

<script lang="ts" setup>
import type { SliderRootEmits, SliderRootProps } from "reka-ui";
import { useForwardPropsEmits } from "reka-ui";
import { computed } from "vue";
import { Slider } from "~/components/ui/slider";

const props = defineProps<SliderRootProps & { unit?: string }>();
const emits = defineEmits<SliderRootEmits>();
const forwarded = useForwardPropsEmits(props, emits);

const min = computed(() => props.min ?? 0);
const max = computed(() => props.max ?? 100);
const unit = computed(() => props.unit ?? "");
</script>
