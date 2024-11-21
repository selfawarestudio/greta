<script setup>
const { header } = defineProps(['header'])
</script>

<template>
  <header
    class="sticky top-0 bg-white border-b-1 border-gray-500 flex items-center justify-between h-56 px-main z-9"
  >
    <nav class="flex items-center gap-x-15 m:gap-x-20">
      <NuxtLink
        v-for="(link, i) in header.primaryNavigation"
        :to="link.href"
        :target="link.target"
        class="hover:text-gray-500"
        :class="{ 'font-bold': i === 0 }"
        >{{ link.title }}</NuxtLink
      >
    </nav>
    <nav class="flex items-center gap-x-15 m:gap-x-20">
      <NuxtLink
        v-for="(link, i) in header.callsToAction"
        :to="link.href"
        :target="link.target"
        :class="{
          'font-bold bg-gray-200 text-gray-800 rounded-6 px-10 m:px-15 py-4 m:py-5 hover:bg-gray-100 transition':
            i === header.callsToAction.length - 1,
          'transition hover:text-gray-500':
            i !== header.callsToAction.length - 1,
        }"
        >{{ link.title }}</NuxtLink
      >
    </nav>
  </header>
</template>
