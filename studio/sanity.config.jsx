import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { muxInput } from 'sanity-plugin-mux-input'
import { colorInput } from '@sanity/color-input'
import { media, mediaAssetSource } from 'sanity-plugin-media'
import { noteField } from 'sanity-plugin-note-field'
import { schemaTypes } from './schemas'
import { vercelWidget } from 'sanity-plugin-dashboard-widget-vercel'
import {
  dashboardTool,
  projectUsersWidget,
  projectInfoWidget,
} from '@sanity/dashboard'
import { Globe, File, ArrowRight } from '@phosphor-icons/react'

const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

const singletonTypes = new Set([
  // 'site'
])

const previewableTypes = new Set(['page'])

export default defineConfig({
  name: 'default',
  title: process.env.SANITY_STUDIO_PROJECT_TITLE,
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET,

  plugins: [
    structureTool({
      structure: S =>
        S.list()
          .id('content')
          .title('Content')
          .items([
            S.listItem()
              .title('Pages')
              .icon(() => <File />)
              .child(S.documentTypeList('page').title('Pages')),
            S.listItem()
              .title('Site')
              .icon(() => <Globe />)
              .child(
                S.document()
                  .schemaType('site')
                  .documentId('site')
                  .title('Site'),
              ),
            S.listItem()
              .title('Redirects')
              .icon(() => <ArrowRight />)
              .child(S.documentTypeList('redirect').title('Redirects')),
          ]),
    }),
    process.env.NODE_ENV !== 'production' && visionTool(),
    muxInput({ mp4_support: 'capped-1080p' }),
    colorInput(),
    media(),
    noteField(),
    dashboardTool({
      widgets: [vercelWidget(), projectUsersWidget(), projectInfoWidget()],
    }),
  ],

  form: {
    image: {
      assetSources: () => [mediaAssetSource],
    },
  },

  schema: {
    types: schemaTypes,
    templates: templates =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
    productionUrl: async (prev, { document }) => {
      const canPreview = previewableTypes.has(document._type)
      try {
        if (canPreview) {
          const local = 'http://localhost:3000'
          const prod = process.env.SANITY_STUDIO_PROD_PREVIEW_URL || local
          const path = `/${document.slug.current}`
          return `${window.location.href.includes('localhost') ? local : prod}${path}?preview=true`
        } else {
          return prev
        }
      } catch (e) {
        return prev
      }
    },
  },

  scheduledPublishing: {
    enabled: false,
  },

  tasks: {
    enabled: false,
  },
})
