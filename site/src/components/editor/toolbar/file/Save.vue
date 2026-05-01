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
const { data } = useDataStore();
const { styles } = useStyleStore();

const save = async () => {
  if (!data.resumeId) return;

  await storageService.updateResume({
    id: data.resumeId,
    name: data.resumeName,
    markdown: data.markdown,
    css: data.css,
    styles: toRaw(styles)
  });
};
</script>
