<template>
  <div />
</template>

<script setup lang="ts">
onMounted(async () => {
  const resumes = await storageService.getResumes();

  if (resumes.length > 0) {
    await navigateTo(`/editor/${resumes[0].id}`, { replace: true });
  } else {
    const resume = await storageService.createResume();
    if (resume) {
      await navigateTo(`/editor/${resume.id}`, { replace: true });
    }
  }
});
</script>
