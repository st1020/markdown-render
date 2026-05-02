<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue"
import { useDataStore } from "@/composables/stores/data"

const downloadFile = (filename: string, content: string) => {
  const element = document.createElement("a")

  element.href = "data:text/plain;charset=utf-8," + encodeURIComponent(content)
  element.download = filename
  element.style.display = "none"

  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

const { data } = useDataStore()

const exportPDF = () => {
  const title = document.title
  document.title = "document"
  window.print()
  document.title = title
}

const exportMd = () => {
  downloadFile("document.md", data.markdown)
}
</script>

<template>
  <Button class="gap-x-1.5 w-full h-8 justify-start" variant="ghost" size="sm" @click="exportPDF">
    <span class="i-mdi:file-pdf text-base" />
    Export PDF
  </Button>

  <Button class="gap-x-1.5 w-full h-8 justify-start" variant="ghost" size="sm" @click="exportMd">
    <span class="i-ri:markdown-fill text-base" />
    Export Markdown
  </Button>
</template>
