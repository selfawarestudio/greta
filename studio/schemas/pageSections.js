import { defineType } from 'sanity'
import { PAGE_SECTION_TYPES } from '../lib/constants'

export const pageSections = defineType({
  name: 'pageSections',
  type: 'array',
  of: PAGE_SECTION_TYPES,
})
