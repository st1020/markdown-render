<template>
  <EditorToolbarBox text="File" icon="i-carbon:import-export">
    <EditorToolbarFileSave />
    <EditorToolbarFileExport />
  </EditorToolbarBox>
</template>

<script setup lang="ts">
import EditorToolbarBox from "../Box.vue";
import EditorToolbarFileExport from "./Export.vue";
import EditorToolbarFileSave from "./Save.vue";
</script>
