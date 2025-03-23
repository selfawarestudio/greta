<script setup>
import { ExampleSection } from '#components'
import { titleCase } from 'scule'

const { section, sectionIndex } = defineProps(['section', 'sectionIndex'])

const COMPONENT_MAP = {
  exampleSection: ExampleSection,
}

const SectionComponent = COMPONENT_MAP[section._type]
</script>

<template>
  <component
    v-if="SectionComponent"
    :is="SectionComponent"
    :section="section"
    :sectionIndex="sectionIndex"
  />
  <Placeholder v-else>
    {{ titleCase(section._type) }}
  </Placeholder>
</template>
