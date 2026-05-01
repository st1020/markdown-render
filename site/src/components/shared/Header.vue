<template>
  <header class="hstack justify-between pl-4 pr-1">
    <div class="hstack gap-x-2">
      <SharedLogo text-base />
      <div text-lg>Oh<span text-primary>My</span>CV</div>
    </div>

    <div class="hstack">
      <slot name="tail" />

      <SharedToggleDark />

      <UiButton
        as="a"
        variant="ghost-secondary"
        size="round"
        href="http://github.com/Renovamen/oh-my-cv"
        target="_blank"
        rel="nofollow noopener"
      >
        <span i-tabler:brand-github text-lg />
      </UiButton>
    </div>
  </header>
</template>
