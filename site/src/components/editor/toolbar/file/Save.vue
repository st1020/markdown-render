<template>
  <Button
    class="gap-x-1.5 w-full h-8 justify-start"
    variant="ghost"
    size="sm"
    @click="save"
  >
    <span class="i-ic:baseline-save text-base" />
    Save
  </Button>
</template>

<script lang="ts" setup>
import Button from "~/components/ui/button/Button.vue";
import { storageService } from "~/utils/storage";

const save = () => storageService.save();
</script>
