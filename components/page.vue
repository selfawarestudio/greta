<script setup>
const { site } = defineProps(['site'])
</script>

<template>
  <div class="absolute w-full">
    <main class="min-h-screen pt-56">
      <slot />
    </main>
    <SiteFooter :footer="site.footer" />
  </div>
</template>
