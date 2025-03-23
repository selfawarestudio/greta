import { defineField, defineType } from 'sanity'
import { resolvePath } from '../lib/resolvePath'
import { Link } from '@phosphor-icons/react'

const INTERNAL_LINK_REFERENCE_LIST = [{ type: 'page' }]

export function defineInternalLink(options = {}) {
  const {
    name = 'internalLink', // default options
    title = 'Internal Link',
    icon = Link,
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
        name: 'reference',
        title: 'Reference',
        type: 'reference',
        to: INTERNAL_LINK_REFERENCE_LIST,
        validation: Rule => Rule.required(),
      }),
      withTitle &&
        defineField({
          name: 'title',
          title: 'Title',
          description:
            'Optional. If not provided, the title of the referenced document will be used.',
          type: 'string',
        }),
      defineField({
        name: 'newTab',
        title: 'Open in a new tab?',
        type: 'boolean',
        initialValue: false,
      }),
      ...fields,
    ].filter(Boolean),
    preview: {
      select: {
        title: 'title',
        referenceTitle: 'reference.title',
        type: 'reference._type',
        slug: 'reference.slug.current',
      },
      prepare: ({ title, referenceTitle, type, slug }) => ({
        title: title ?? referenceTitle ?? '',
        subtitle: resolvePath(slug, type) ?? '',
      }),
    },
  })
}

export const internalLink = defineInternalLink()
