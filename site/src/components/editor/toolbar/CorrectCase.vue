<template>
  <EditorToolbarBox text="Correct Case" icon="i-icon-park-outline:check-correct">
    <UiAlert>
      <UiAlertTitle>Example</UiAlertTitle>
      <UiAlertDescription> "Github" → "GitHub" </UiAlertDescription>
    </UiAlert>

    <UiAlert variant="info" class="mt-3">
      <UiAlertTitle>Note</UiAlertTitle>
      <UiAlertDescription>
        Words that are only in uppercase or lowercase ("GITHUB" or "github") will be left
        untouched.
      </UiAlertDescription>
    </UiAlert>

    <div class="mt-3 text-right">
      <UiButton @click="correct" size="sm">
        <span i-carbon:rocket mr-1 />
        Correct it!
      </UiButton>
    </div>
  </EditorToolbarBox>
</template>

<script lang="ts" setup>
import { replace } from "~/lib/case-police";

const { data, setAndSyncToMonaco } = useDataStore();
const toast = useToast();

const correct = async () => {
  const md = data.markdown;
  const result = replace(md);

  setAndSyncToMonaco("markdown", result?.code ?? md);
  toast.correct(result?.changed);
};
</script>
