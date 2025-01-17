import { defineArrayMember, defineField } from 'sanity'

export const link = defineField({
  name: 'link',
  type: 'array',
  of: [
    defineArrayMember({ type: 'internalLink' }),
    defineArrayMember({ type: 'externalLink' }),
  ],
})
