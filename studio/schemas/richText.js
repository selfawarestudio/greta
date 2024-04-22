import { defineArrayMember, defineField } from 'sanity'
import { LINK_ANNOTATIONS } from '../lib/constants'

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
        annotations: LINK_ANNOTATIONS,
      },
    }),
    defineArrayMember({ type: 'image' }),
  ],
})
