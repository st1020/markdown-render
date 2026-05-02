import { useEventListener } from "@vueuse/core"
import { watch } from "vue"

import { useDataStore } from "@/composables/stores/data"
import { useStyleStore } from "@/composables/stores/style"
import { isDirty } from "@/utils/storage"

export const useUnsavedChanges = () => {
  const { data } = useDataStore()
  const { styles } = useStyleStore()

  // Mark dirty when markdown / css changes — but only after initial load
  watch(
    () => [data.markdown, data.css] as const,
    () => {
      if (data.loaded) isDirty.value = true
    },
  )

  // Mark dirty when any style property changes
  watch(
    styles,
    () => {
      if (data.loaded) isDirty.value = true
    },
    { deep: true },
  )

  // Block page close with the browser's native "Leave site?" dialog
  useEventListener(window, "beforeunload", (e: BeforeUnloadEvent) => {
    if (!isDirty.value) return
    e.preventDefault()
    // Required for legacy browsers (Chrome < 119, Firefox, Safari)
    e.returnValue = ""
  })

  return { isDirty }
}
