import {defineArrayMember, defineType} from 'sanity'
import {LINK_ANNOTATIONS} from '../lib/constants'

export const basicText = defineType({
  name: 'basicText',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [],
      lists: [],
      marks: {
        decorators: [],
        annotations: LINK_ANNOTATIONS,
      },
    }),
  ],
})
