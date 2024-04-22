import {defineField, defineType} from 'sanity'
import {INTERNAL_LINK_REFERENCE_LIST} from '../lib/constants'
import {resolvePath} from '../lib/helpers'
import {Link} from '@phosphor-icons/react'

export const internalLink = defineType({
  name: 'internalLink',
  title: 'Internal Link',
  type: 'object',
  fields: [
    defineField({
      name: 'reference',
      title: 'Reference',
      type: 'reference',
      to: INTERNAL_LINK_REFERENCE_LIST,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      description: 'Optional. If not provided, the title of the referenced document will be used.',
      type: 'string',
    }),
    defineField({
      name: 'newTab',
      title: 'Open in a new tab?',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      referenceTitle: 'reference.title',
      type: 'reference._type',
      slug: 'reference.slug.current',
    },
    prepare: ({title, referenceTitle, type, slug}) => ({
      title: title ?? referenceTitle ?? '',
      subtitle: resolvePath(slug, type) ?? '',
      media: Link,
    }),
  },
})
