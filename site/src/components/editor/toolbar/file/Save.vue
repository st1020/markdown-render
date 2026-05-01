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
const save = () => storageService.save();
</script>
