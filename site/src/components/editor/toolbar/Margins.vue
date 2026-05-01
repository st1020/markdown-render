<template>
  <EditorToolbarBox text="Margins" icon="i-radix-icons:margin">
    <div hstack text-muted-foreground gap-x-1 justify-end>
      <span i-icon-park-outline:margin-one />
      Top &amp; Bottom
    </div>

    <Slider
      unit="px"
      :model-value="vModelValue"
      @update:model-value="
        (value) => {
          vModelValue = value!;
          setStyle('marginV', value!.at(0)!);
        }
      "
    />

    <div mt-4 hstack text-muted-foreground gap-x-1 justify-end>
      <span i-icon-park-outline:margin />
      Left &amp; Right
    </div>

    <Slider
      unit="px"
      :model-value="hModelValue"
      @update:model-value="
        (value) => {
          hModelValue = value!;
          setStyle('marginH', value!.at(0)!);
        }
      "
    />
  </EditorToolbarBox>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Slider from "~/components/common/Slider.vue";
import { useStyleStore } from "~/composables/stores/style";
import EditorToolbarBox from "./Box.vue";

const { styles, setStyle } = useStyleStore();

const vModelValue = ref([styles.marginV]);
const hModelValue = ref([styles.marginH]);
</script>
