<script setup lang="ts">
import { useColorMode, useCycleList, useWindowSize } from "@vueuse/core"
import { SplitterGroup, SplitterPanel, SplitterResizeHandle } from "reka-ui"
import { onMounted, ref, watchEffect } from "vue"

import EditorCode from "@/components/editor/Code.vue"
import EditorPreview from "@/components/editor/Preview.vue"
import EditorToolbar from "@/components/editor/toolbar/index.vue"
import Button from "@/components/ui/button/Button.vue"
import Skeleton from "@/components/ui/skeleton/Skeleton.vue"
import { useDataStore } from "@/composables/stores/data"
import { useUnsavedChanges } from "@/composables/unsaved"
import { storageService } from "@/utils/storage"

import Sonner from "./components/ui/sonner/Sonner.vue"

const { data } = useDataStore()
useUnsavedChanges()

onMounted(async () => {
  await storageService.load()
})

// Toggle toolbar
const { width } = useWindowSize()
const isToolbarOpen = ref(width.value > 1024)

//  Toggle dark mode
const mode = useColorMode({ emitAuto: true })
const { state, next } = useCycleList(["auto", "light", "dark"] as const, {
  initialValue: mode,
})
watchEffect(() => (mode.value = state.value))
</script>

<template>
  <div class="font-ui">
    <div id="editor-page" class="flex flex-col">
      <header class="px-4 hstack justify-between">
        <div class="hstack gap-x-2">
          <div class="text-lg"><span class="text-primary">Markdown</span>Render</div>
        </div>

        <div class="hstack">
          <Button variant="ghost-secondary" size="round" aria-label="Toggle theme" @click="next()">
            <i v-if="state === 'dark'" class="i-ph:moon-bold size-4" />
            <i v-if="state === 'light'" class="i-ph:sun-bold size-4" />
            <i
              v-if="state === 'auto'"
              class="i-material-symbols:night-sight-auto-rounded size-4.5"
            />
          </Button>
          <Button
            as="a"
            variant="ghost-secondary"
            size="round"
            href="https://github.com/st1020/markdown-render"
            target="_blank"
            rel="nofollow noopener"
          >
            <span class="i-simple-icons:github text-lg" />
          </Button>
          <Button
            variant="ghost-secondary"
            size="round"
            :aria-label="isToolbarOpen ? 'Close toolbar' : 'Open toolbar'"
            @click="isToolbarOpen = !isToolbarOpen"
          >
            <span
              :class="[
                'size-4.5',
                isToolbarOpen
                  ? 'i-tabler:layout-sidebar-right-collapse'
                  : 'i-tabler:layout-sidebar-right-expand',
              ]"
            />
          </Button>
        </div>
      </header>

      <div class="workspace pb-2 flex">
        <SplitterGroup id="splitter-editor" direction="horizontal" class="px-3">
          <SplitterPanel id="code-pane">
            <EditorCode v-if="data.loaded" />
            <div v-else class="flex flex-col gap-y-2 h-full">
              <Skeleton class="bg-secondary h-10" />
              <Skeleton class="bg-secondary flex-1" />
            </div>
          </SplitterPanel>

          <SplitterResizeHandle
            id="code-preview-handle"
            class="w-3 relative after:(m-auto rounded-full bg-gray-400/40 h-10 w-1 content-[''] inset-0 absolute)"
          />

          <SplitterPanel id="preview-pane">
            <EditorPreview v-if="data.loaded" />
            <Skeleton v-else class="bg-secondary size-full" />
          </SplitterPanel>
        </SplitterGroup>

        <div
          v-if="isToolbarOpen"
          id="tools-pane"
          class="lt-lg:pb-10 lt-lg:h-full lt-lg:max-w-full lt-lg:right-0 lt-lg:top-12 lt-lg:fixed lt-lg:z-10"
        >
          <EditorToolbar v-if="data.loaded" />
          <Skeleton v-else class="mr-3 bg-secondary h-full w-62" />
        </div>
      </div>
    </div>
    <Sonner close-button />
  </div>
</template>
