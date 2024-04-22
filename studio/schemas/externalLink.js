import {defineField, defineType} from 'sanity'
import {ArrowSquareOut} from '@phosphor-icons/react'

export const externalLink = defineType({
  name: 'externalLink',
  title: 'External Link',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'Use mailto: or tel: prefix for email and phone links.',
      validation: (Rule) => Rule.required().uri({scheme: ['http', 'https', 'tel', 'mailto']}),
    }),
    defineField({
      name: 'newTab',
      title: 'Open in a new tab?',
      type: 'boolean',
      initialValue: true,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      url: 'url',
    },
    prepare({title, url}) {
      return {
        title,
        subtitle: url,
        media: ArrowSquareOut,
      }
    },
  },
})
