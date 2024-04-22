import { defineType, defineArrayMember } from 'sanity'
import { IMAGE_FORMAT_ACCEPT_LIST } from '../lib/constants'

export const media = defineType({
  type: 'array',
  name: 'media',
  title: 'Media',
  of: [
    defineArrayMember({
      title: 'Image',
      type: 'image',
      options: {
        accept: IMAGE_FORMAT_ACCEPT_LIST,
      },
    }),
    defineArrayMember({ title: 'Mux Video', type: 'mux.video' }),
  ],
})
