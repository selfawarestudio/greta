import { defineField, defineType } from 'sanity'
import { ArrowSquareOut } from '@phosphor-icons/react'

export function defineExternalLink(options = {}) {
  const {
    name = 'externalLink', // default options
    title = 'External Link',
    icon = ArrowSquareOut,
    withTitle = true,
    fields = [],
  } = options

  return defineType({
    name,
    title,
    icon,
    type: 'object',
    fields: [
      defineField({
        name: 'url',
        title: 'URL',
        type: 'url',
        description: 'Use mailto: or tel: prefix for email and phone links.',
        validation: Rule =>
          Rule.required().uri({ scheme: ['http', 'https', 'tel', 'mailto'] }),
      }),
      withTitle &&
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: Rule => Rule.required(),
        }),
      defineField({
        name: 'newTab',
        title: 'Open in a new tab?',
        type: 'boolean',
        initialValue: true,
        validation: Rule => Rule.required(),
      }),
      ...fields,
    ].filter(Boolean),
    preview: {
      select: {
        title: 'title',
        url: 'url',
      },
      prepare({ title, url }) {
        return {
          title,
          subtitle: url,
          media: icon,
        }
      },
    },
  })
}

export const externalLink = defineExternalLink()
