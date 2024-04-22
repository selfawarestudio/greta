import {defineType} from 'sanity'

export const sectionReference = defineType({
  title: 'Section Reference',
  name: 'sectionReference',
  type: 'reference',
  to: [{type: 'section'}],
  validation: (Rule) => Rule.required(),
})
