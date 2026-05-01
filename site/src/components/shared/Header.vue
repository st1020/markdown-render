<template>
  <header class="hstack justify-between pl-4 pr-1">
    <div class="hstack gap-x-2">
      <div text-lg>Oh<span text-primary>My</span>CV</div>
    </div>

    <div class="hstack">
      <slot name="tail" />
    </div>
  </header>
</template>
