<script setup lang="ts">
import { TabsIndicator, TabsList, TabsRoot, TabsTrigger } from "reka-ui"
import { onBeforeUnmount, onMounted, ref } from "vue"

import { useMonaco } from "@/composables/monaco"

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
    class="pane-container bg-background flex flex-col overflow-hidden"
    default-value="markdown"
    @update:model-value="(payload) => activateModel(payload)"
  >
    <TabsList
      class="text-sm px-4 border-b hstack shrink-0 h-9 w-full relative md:text-base md:h-10"
    >
      <TabsIndicator
        class="rounded-full bg-primary h-0.5 w-[--reka-tabs-indicator-size] translate-x-[--reka-tabs-indicator-position] transition-[width,transform] duration-300 bottom-0 left-0 absolute"
      />
      <TabsTrigger value="markdown" class="px-2" :disabled="loading">Markdown</TabsTrigger>
      <TabsTrigger value="css" class="px-4" :disabled="loading">CSS</TabsTrigger>
    </TabsList>

    <div ref="editor" class="flex-1" />
  </TabsRoot>
</template>
