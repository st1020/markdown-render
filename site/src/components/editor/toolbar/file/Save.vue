<template>
  <UiButton
    class="gap-x-1.5 w-full h-8 justify-start"
    variant="ghost"
    size="sm"
    @click="save"
  >
    <span i-ic:baseline-save text-base />
    Save
  </UiButton>
</template>

<script lang="ts" setup>
import UiButton from "~/components/ui/button/Button.vue";
import { storageService } from "~/utils/storage";

const save = () => storageService.save();
</script>
