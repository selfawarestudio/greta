export const link = groq`{
  _type,
  defined(_key) =>{
    _key,
  },
  _type == 'internalLink' => {
    defined(title) => {
      title,
    },
    !defined(title) => {
      'title': reference->title,
    },
    ...(reference-> {
      _type == 'page' => {
        'href': select(
          *[_type == 'site'][0].homepage->slug.current == slug.current => '/',
          '/' + slug.current,
        ),
      },
    }),
  },
  _type == 'externalLink' => {
    title,
    'href': url,
  },
  newTab => {
    'target': '_blank',
  },
}`

export const image = groq`{
  _type,
  ...(asset-> {
    _id,
    url,
    'alt': altText,
    'width': metadata.dimensions.width,
    'height': metadata.dimensions.height,
    'lqip': metadata.lqip,
  }),
}`

export const video = groq`{
  _type,
  ...(asset-> {
    playbackId,
    'width': data.static_renditions.files[0].width,
    'height': data.static_renditions.files[0].height,
  }),
}`

export const media = groq`{
  _type == 'image' => ${image},
  _type == 'mux.video' => ${video},
}`

export const linkableText = groq`{
  ...,
  markDefs[] ${link},
}`

/**
 * Matches schema of useSeoMeta composable
 * https://nuxt.com/docs/api/composables/use-seo-meta
 */
export const seoMeta = groq`{
  title,
  ogTitle,
  description,
  ogDescription,
  ogImage ${image},
  'twitterCard': 'summary_large_image',
}`

export const sections = groq`{
  _type,
  _key,
  _type == 'exampleSection' => {
    headline,
    copy,
    button[0] ${link},
    media[0] ${media},
  },
}`

export const pageProps = groq`{
  title,
  'slug': slug.current,
  'seo': ${seoMeta},
  sections[] ${sections},
}`

export const homepage = groq`*[_type == 'site'][0].homepage-> ${pageProps}`
export const page = groq`*[_type == 'page' && slug.current == $slug][0] ${pageProps}`

export const site = groq`*[_type == 'site'][0] {
  'seo': ${seoMeta},
  header {
    primaryNavigation[] ${link},
    callsToAction[] ${link},
  },
  footer {
    linkGroups[] {
      title,
      links[] ${link},
    },
    copyrightText,
    secondaryLinks[] ${link},
  },
}`
