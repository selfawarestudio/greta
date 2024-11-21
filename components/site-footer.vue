<script setup>
const { footer } = defineProps(['footer'])
</script>

<template>
  <footer class="bg-gray-200 px-main pt-40 pb-30 grid-main gap-y-50">
    <div class="col-span-full m:col-span-6">
      <h3 class="font-bold">Greta's Playground</h3>
    </div>
    <div v-for="group in footer.linkGroups" class="col-span-6 m:col-span-3">
      <h4 class="font-bold mb-10">{{ group.title }}</h4>
      <NuxtLink
        v-for="link in group.links"
        :to="link.href"
        :target="link.target"
        class="block transition hover:text-gray-500"
        >{{ link.title }}</NuxtLink
      >
    </div>
    <div
      class="col-span-full flex gap-x-15 m:gap-x-20 text-gray-600 mt-75 m:mt-150"
    >
      <p>
        {{
          footer.copyrightText.replaceAll('{year}', new Date().getFullYear())
        }}
      </p>
      |
      <NuxtLink
        v-for="link in footer.secondaryLinks"
        :to="link.href"
        :target="link.target"
        class="transition hover:text-gray-400"
        >{{ link.title }}</NuxtLink
      >
    </div>
  </footer>
</template>
