<template>
  <div class="font-ui">
    <EditorPage />
    <Toaster close-button />
  </div>
</template>

<script setup lang="ts">
import Toaster from "./components/ui/sonner/Sonner.vue";
import EditorPage from "./pages/index.vue";
</script>
