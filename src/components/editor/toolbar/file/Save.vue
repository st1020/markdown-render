<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue"
import { useShortcuts } from "@/composables/shortcuts"
import { storageService } from "@/utils/storage"

const save = () => storageService.save()

// Use the shortcut to save the current resume
useShortcuts("ctrl+s", save)
</script>

<template>
  <Button class="gap-x-1.5 h-8 w-full justify-start" variant="ghost" size="sm" @click="save">
    <span class="i-ic:baseline-save text-base" />
    Save
    <span class="text-xs text-muted-foreground tracking-widest text-right flex-1">⌘ S</span>
  </Button>
</template>
