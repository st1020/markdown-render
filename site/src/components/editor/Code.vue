<script setup lang="ts">
import { TabsIndicator, TabsList, TabsRoot, TabsTrigger } from "reka-ui"
import { onBeforeUnmount, onMounted, ref } from "vue"

import { useMonaco } from "~/composables/monaco"

const editor = ref<HTMLDivElement>()
const { setup, activateModel, dispose, loading } = useMonaco()

onMounted(async () => {
  await setup(editor.value)
  activateModel("markdown")
})

onBeforeUnmount(dispose)
</script>

<template>
  <TabsRoot
    class="pane-container overflow-hidden bg-background flex flex-col"
    default-value="markdown"
    @update:model-value="(payload) => activateModel(payload)"
  >
    <TabsList
      class="relative shrink-0 hstack w-full text-sm h-9 border-b px-4 md:text-base md:h-10"
    >
      <TabsIndicator
        class="absolute left-0 bottom-0 h-0.5 bg-primary rounded-full w-[--reka-tabs-indicator-size] translate-x-[--reka-tabs-indicator-position] transition-[width,transform] duration-300"
      />
      <TabsTrigger value="markdown" class="px-2" :disabled="loading">Markdown</TabsTrigger>
      <TabsTrigger value="css" class="px-4" :disabled="loading">CSS</TabsTrigger>
    </TabsList>

    <div ref="editor" class="flex-1" />
  </TabsRoot>
</template>
