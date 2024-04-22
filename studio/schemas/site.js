import { defineArrayMember, defineField, defineType } from 'sanity'

export const site = defineType({
  name: 'site',
  title: 'Site',
  type: 'document',
  groups: [
    { title: 'Site', name: 'site', default: true },
    { title: 'Default SEO', name: 'seo' },
  ],
  fields: [
    defineField({
      name: 'homepage',
      title: 'Homepage',
      type: 'reference',
      to: [{ type: 'page' }],
      validation: Rule => Rule.required(),
      group: 'site',
    }),
    defineField({
      name: 'header',
      title: 'Header',
      type: 'object',
      group: 'site',
      fields: [
        defineField({
          name: 'primaryNavigation',
          title: 'Primary Navigation',
          type: 'link',
          validation: Rule => Rule.required().min(1),
        }),
        defineField({
          name: 'callsToAction',
          title: 'Calls to Action',
          type: 'link',
          description:
            'The last link will be displayed as a button on desktop. They will both be displayed as buttons on mobile.',
          validation: Rule => Rule.required().min(1).max(2),
        }),
      ],
    }),
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'object',
      group: 'site',
      fields: [
        defineField({
          name: 'linkGroups',
          title: 'Link Groups',
          type: 'array',
          validation: Rule => Rule.required().min(1),
          of: [
            defineArrayMember({
              name: 'linkGroup',
              title: 'Link Group',
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                  validation: Rule => Rule.required(),
                }),
                defineField({
                  name: 'links',
                  title: 'Links',
                  type: 'link',
                  validation: Rule => Rule.required().min(1),
                }),
              ],
            }),
          ],
        }),
        defineField({
          name: 'secondaryLinks',
          title: 'Secondary Links',
          type: 'link',
          validation: Rule => Rule.required().min(1),
        }),
        defineField({
          name: 'copyrightText',
          title: 'Copyright Text',
          type: 'string',
          description: 'Use {year} to insert the current year.',
          validation: Rule => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'title',
      title: 'Document Title',
      type: 'string',
      group: 'seo',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Meta Description',
      type: 'string',
      group: 'seo',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'ogTitle',
      title: 'Open Graph Title',
      type: 'string',
      group: 'seo',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'ogDescription',
      title: 'Open Graph Description',
      type: 'string',
      group: 'seo',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      group: 'seo',
      validation: Rule => Rule.required(),
    }),
  ],
})
