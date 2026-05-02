<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "~/utils/shadcn";

const props = defineProps<{
  text: string;
  icon?: HTMLAttributes["class"];
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div :class="cn('px-4 py-6 text-sm', props.class)">
    <div class="hstack gap-x-2 mb-4 text-base">
      <span v-if="icon" :class="icon" />
      {{ text }}
    </div>

    <slot />
  </div>
</template>
