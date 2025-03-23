import { defineArrayMember, defineType } from 'sanity'
import { defineInternalLink } from './internalLink'
import { defineExternalLink } from './externalLink'

export const linkableText = defineType({
  name: 'linkableText',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [],
      lists: [],
      marks: {
        decorators: [],
        annotations: [
          defineInternalLink({ withTitle: false }),
          defineExternalLink({ withTitle: false }),
        ],
      },
    }),
  ],
})
