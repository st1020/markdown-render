<template>
  <EditorToolbarBox text="Font Family" icon="i-material-symbols:font-download-outline">
    <div class="w-full hstack gap-x-2 mb-2">
      <Combobox
        id="font-cjk"
        class="flex-1"
        :items="localCjk"
        :default-value="styles.fontCJK.fontFamily || styles.fontCJK.name"
      />
      <span class="w-13">CJK</span>
    </div>

    <div class="hstack gap-x-2 w-full">
      <Combobox
        id="font-en"
        class="flex-1"
        :items="localEn"
        :default-value="styles.fontEN.fontFamily || styles.fontEN.name"
      />
      <span class="w-13">English</span>
    </div>
  </EditorToolbarBox>
</template>

<script lang="ts" setup>
import type { ComboboxItem } from "~/components/common/Combobox.vue";
import Combobox from "~/components/common/Combobox.vue";
import { useConstant } from "~/composables/constant";
import { useStyleStore } from "~/composables/stores/style";
import EditorToolbarBox from "./Box.vue";

const { styles, setStyle } = useStyleStore();
const { FONT } = useConstant();

const localEn = FONT.LOCAL.EN.map<ComboboxItem>((item) => {
  const family =
    FONT.LOCAL.EN.find((font) => font.name === item.name)?.fontFamily || item.name;
  return {
    label: item.name,
    value: family,
    onSelect: () => setStyle("fontEN", { name: item.name, fontFamily: family })
  };
});

const localCjk = FONT.LOCAL.CJK.map<ComboboxItem>((item) => {
  const family =
    FONT.LOCAL.CJK.find((font) => font.name === item.name)?.fontFamily || item.name;
  return {
    label: item.name,
    value: family,
    onSelect: () => setStyle("fontCJK", { name: item.name, fontFamily: family })
  };
});
</script>
