import { defineField, defineType } from 'sanity'

export const exampleSection = defineType({
  name: 'exampleSection',
  title: 'Example Section',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'copy',
      title: 'Copy',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'link',
      validation: Rule => Rule.required().max(1),
    }),
    defineField({
      name: 'media',
      title: 'Media',
      type: 'media',
      validation: Rule => Rule.required().max(1),
    }),
  ],
  preview: {
    select: {},
    prepare: selection => {
      return {
        ...selection,
        title: 'Example Section',
      }
    },
  },
})
