import { defineField } from 'sanity'
import { Link, ArrowSquareOut } from '@phosphor-icons/react'
import sortBy from 'just-sort-by'

export const IMAGE_FORMAT_ACCEPT_LIST = '.jpg,.jpeg,.png,.webp,.avif,.svg'

export const INTERNAL_LINK_REFERENCE_LIST = [
  { type: 'page' }, //
]

export const PAGE_SECTION_TYPES = sortBy(
  [
    { type: 'exampleSection' }, //
  ],
  'type',
)

export const LINK_ANNOTATIONS = [
  defineField({
    name: 'internalLink',
    title: 'Internal Link',
    type: 'object',
    icon: Link,
    fields: [
      defineField({
        name: 'reference',
        title: 'Reference',
        type: 'reference',
        to: INTERNAL_LINK_REFERENCE_LIST,
        validation: Rule => Rule.required(),
      }),
      defineField({
        name: 'newTab',
        title: 'Open in a new tab?',
        type: 'boolean',
        initialValue: false,
        validation: Rule => Rule.required(),
      }),
    ],
  }),
  defineField({
    name: 'externalLink',
    title: 'External Link',
    type: 'object',
    icon: ArrowSquareOut,
    fields: [
      defineField({
        name: 'url',
        title: 'URL',
        type: 'url',
        description: 'Use mailto: or tel: prefix for email and phone links.',
        validation: Rule =>
          Rule.required().uri({
            scheme: ['http', 'https', 'tel', 'mailto'],
          }),
      }),
      defineField({
        name: 'newTab',
        title: 'Open in a new tab?',
        type: 'boolean',
        initialValue: true,
        validation: Rule => Rule.required(),
      }),
    ],
  }),
]
