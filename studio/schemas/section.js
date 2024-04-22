import sortBy from 'just-sort-by'
import {defineField, defineType} from 'sanity'
import {PAGE_SECTION_TYPES} from '../lib/constants'

export const section = defineType({
  name: 'section',
  title: 'Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Only used in the CMS',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: sortBy(PAGE_SECTION_TYPES, 'type'),
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
})
