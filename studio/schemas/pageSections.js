import { defineType } from 'sanity'
import sortBy from 'just-sort-by'

const PAGE_SECTION_TYPES = sortBy(
  [
    { type: 'exampleSection' }, //
  ],
  'type',
)

const STANDALONE_SECTIONS = new Map([
  // ['name', 'Name'],
])

const ONCE_PER_PAGE_SECTIONS = new Map([
  // ['name', 'Name'],
])

export const pageSections = defineType({
  name: 'pageSections',
  type: 'array',
  of: sortBy(PAGE_SECTION_TYPES, 'type'),
  validation: Rule =>
    Rule.custom(sections => {
      if (!sections?.length) return 'Page must have at least one section'

      if (sections.length === 1) return true

      // Check standalone sections
      const standaloneSection = sections.find(section =>
        STANDALONE_SECTIONS.has(section._type),
      )
      if (standaloneSection && sections.length > 1) {
        return `${STANDALONE_SECTIONS.get(standaloneSection._type)} must be the only section`
      }

      // Check for sections that can only appear once
      const oncePerPageCounts = sections.reduce((counts, section) => {
        if (ONCE_PER_PAGE_SECTIONS.has(section._type)) {
          counts[section._type] = (counts[section._type] || 0) + 1
        }
        return counts
      }, {})

      for (const [type, count] of Object.entries(oncePerPageCounts)) {
        if (count > 1) {
          return `${ONCE_PER_PAGE_SECTIONS.get(type)} can only appear once per page`
        }
      }

      return true
    }),
})
