import { defineField, defineType } from 'sanity'
import { SlugInput } from 'sanity-plugin-prefixed-slug'

export const page = defineType({
  title: 'Page',
  name: 'page',
  type: 'document',
  groups: [
    { title: 'Content', name: 'content', default: true },
    { title: 'SEO', name: 'seo' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
      group: ['content', 'seo'],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      components: {
        input: SlugInput,
      },
      options: {
        source: 'title',
        urlPrefix: `${process.env.SANITY_STUDIO_SLUG_INPUT_URL_PREFIX}/`,
      },
      validation: Rule => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      rows: 2,
      group: 'seo',
    }),
    defineField({
      name: 'ogTitle',
      title: 'Open Graph Title',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'ogDescription',
      title: 'Open Graph Description',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      group: 'seo',
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'pageSections',
      group: 'content',
    }),
  ],
})
