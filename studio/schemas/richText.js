import { defineArrayMember, defineField } from 'sanity'
import { defineInternalLink } from './internalLink'
import { defineExternalLink } from './externalLink'

export const richText = defineField({
  name: 'richText',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Paragraph', value: 'normal' },
        { title: 'Heading Small', value: 'h4' },
        { title: 'Heading Medium', value: 'h3' },
        { title: 'Heading Large', value: 'h2' },
      ],
      lists: [
        { title: 'Bullet List', value: 'bullet' },
        { title: 'Number List', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Italic', value: 'em' },
          { title: 'Bold', value: 'strong' },
        ],
        annotations: [
          defineInternalLink({ withTitle: false }),
          defineExternalLink({ withTitle: false }),
        ],
      },
    }),
    defineArrayMember({ type: 'image' }),
  ],
})
