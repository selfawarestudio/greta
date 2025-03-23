import { defineType, defineArrayMember } from 'sanity'

const IMAGE_FORMAT_ACCEPT_LIST = '.jpg,.jpeg,.png,.webp,.avif,.svg'

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
    defineArrayMember({ title: 'Video', type: 'mux.video' }),
  ],
})
