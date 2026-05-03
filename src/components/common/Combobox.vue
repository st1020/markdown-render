<script setup lang="ts">
import { CheckIcon, ChevronsUpDownIcon } from "lucide-vue-next"
import { ref } from "vue"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/utils/shadcn"

export interface ComboboxItem {
  label: string
  value: string
  onSelect: () => void
}

const props = defineProps<{
  id: string
  items: Array<ComboboxItem>
  defaultValue: string
}>()

const open = ref(false)
const value = ref(props.defaultValue)
</script>

<template>
  <div>
    <Popover v-model:open="open">
      <PopoverTrigger as-child>
        <Button
          variant="outline"
          role="combobox"
          :aria-expanded="open"
          class="w-full capitalize justify-between"
        >
          {{ items.find((item) => item.value === value)?.label ?? value }}
          <ChevronsUpDownIcon class="ml-2 opacity-50 shrink-0 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent class="p-0 w-full">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                v-for="item in items"
                :key="item.value"
                :value="item.value"
                @select="
                  () => {
                    value = item.value
                    item.onSelect()
                    open = false
                  }
                "
              >
                <CheckIcon
                  :class="cn('mr-2 h-4 w-4', value === item.value ? 'opacity-100' : 'opacity-0')"
                />
                <span class="capitalize">{{ item.label }}</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </div>
</template>
