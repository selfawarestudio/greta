<script setup>
const { section, sectionIndex } = defineProps(['section', 'sectionIndex'])
</script>

<template>
  <div class="px-main mt-main mb-main">
    <h2 class="font-bold mb-8">Example Section</h2>
    <pre class="bg-gray-50 p-16 rounded-8 overflow-auto">{{
      JSON.stringify(section, null, 2)
    }}</pre>
  </div>
</template>
