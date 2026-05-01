<template>
  <div id="editor-page" class="flex flex-col">
    <header class="hstack justify-between pl-4 pr-1">
      <div class="hstack gap-x-2">
        <div text-lg>Oh<span text-primary>My</span>CV</div>
      </div>

      <div class="hstack">
        <Button
          variant="ghost-secondary"
          size="round"
          @click="isToolbarOpen = !isToolbarOpen"
          :aria-label="isToolbarOpen ? 'Close toolbar' : 'Open toolbar'"
        >
          <span
            :class="[
              'size-4.5',
              isToolbarOpen
                ? 'i-tabler:layout-sidebar-right-collapse'
                : 'i-tabler:layout-sidebar-right-expand'
            ]"
          />
        </Button>
      </div>
    </header>

    <div class="workspace flex pb-2">
      <SplitterGroup id="splitter-editor" direction="horizontal" class="px-3">
        <SplitterPanel id="code-pane">
          <EditorCode v-if="data.loaded" />
          <div v-else class="flex flex-col gap-y-2 h-full">
            <Skeleton class="h-10 bg-secondary" />
            <Skeleton class="flex-1 bg-secondary" />
          </div>
        </SplitterPanel>

        <SplitterResizeHandle
          id="code-preview-handle"
          class="w-3 relative after:(content-[''] absolute bg-gray-400/40 w-1 h-10 rounded-full inset-0 m-auto)"
        />

        <SplitterPanel id="preview-pane">
          <EditorPreview v-if="data.loaded" />
          <Skeleton v-else class="size-full bg-secondary" />
        </SplitterPanel>
      </SplitterGroup>

      <div
        v-if="isToolbarOpen"
        id="tools-pane"
        lt-lg="fixed z-10 max-w-full h-full right-0 top-12 pb-10"
      >
        <EditorToolbar v-if="data.loaded" />
        <Skeleton v-else class="h-full w-62 bg-secondary mr-3" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useWindowSize } from "@vueuse/core";
import { SplitterGroup, SplitterPanel, SplitterResizeHandle } from "reka-ui";
import { onMounted, ref } from "vue";
import EditorCode from "~/components/editor/Code.vue";
import EditorPreview from "~/components/editor/Preview.vue";
import EditorToolbar from "~/components/editor/toolbar/index.vue";
import Button from "~/components/ui/button/Button.vue";
import Skeleton from "~/components/ui/skeleton/Skeleton.vue";
import { useDataStore } from "~/composables/stores/data";
import { storageService } from "~/utils/storage";

const { data } = useDataStore();

onMounted(async () => {
  await storageService.load();
});

// Toggle toolbar
const { width } = useWindowSize();
const isToolbarOpen = ref(width.value > 1024);
</script>
