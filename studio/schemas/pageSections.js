import {defineType} from 'sanity'
import {PAGE_SECTION_TYPES} from '../lib/constants'
import sortBy from 'just-sort-by'

export const pageSections = defineType({
  name: 'pageSections',
  type: 'array',
  of: sortBy([...PAGE_SECTION_TYPES, {type: 'sectionReference'}], 'type'),
})
