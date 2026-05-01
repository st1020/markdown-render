<template>
  <div class="font-ui">
    <NuxtPage />
    <UiToaster close-button />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Oh My CV! - Free Online Resume Maker",
  meta: [
    {
      name: "keywords",
      content: "resume maker, cv maker, curriculum vitae maker, markdown resume"
    },
    {
      name: "description",
      content:
        "Free online resume maker, allows you to create your resume in minutes with Markdown!"
    },
    { property: "og:title", content: "Oh My CV! - Free Online Resume Maker" },
    {
      property: "og:description",
      content:
        "Free online resume maker, allows you to create your resume in minutes with Markdown!"
    },
    { property: "og:locale", content: "en" },
    { name: "theme-color", content: "#F3F4F6" }
  ],
  link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
  script: [
    {
      src: "https://code.iconify.design/2/2.2.1/iconify.min.js",
      type: "module",
      tagPosition: "bodyClose"
    }
  ]
});
</script>
