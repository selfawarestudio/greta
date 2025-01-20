import { defineType, defineField } from 'sanity'

const slugValidator = rule =>
  rule.required().custom(value => {
    if (!value || !value.current) return "Can't be blank"
    if (!value.current.startsWith('/')) {
      return 'The path must start with a /'
    }
    return true
  })

export const redirect = defineType({
  name: 'redirect',
  title: 'Redirect',
  type: 'document',
  fields: [
    defineField({
      name: 'from',
      type: 'slug',
      validation: rule => slugValidator(rule),
    }),
    defineField({
      name: 'to',
      type: 'slug',
      validation: rule => slugValidator(rule),
    }),
  ],
  preview: {
    select: {
      from: 'from.current',
      to: 'to.current',
    },
    prepare({ from, to }) {
      return {
        title: from && to ? `'${from}' → '${to}'` : 'New Redirect',
      }
    },
  },
})
