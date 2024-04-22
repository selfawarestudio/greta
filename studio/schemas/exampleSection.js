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
    }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'link',
      validation: Rule => Rule.max(1),
    }),
    defineField({
      name: 'media',
      title: 'Media',
      type: 'media',
      validation: Rule => Rule.max(1),
    }),
  ],
  preview: {
    select: {
      subtitle: 'headline',
    },
    prepare: selection => {
      return {
        ...selection,
        title: 'Example Section',
      }
    },
  },
})
