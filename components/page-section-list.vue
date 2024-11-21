<script setup>
const { sections } = defineProps(['sections'])
</script>

<template>
  <main>
    <PageSection
      v-for="(section, index) in sections"
      :section="section"
      :sectionIndex="index"
    />
  </main>
</template>
