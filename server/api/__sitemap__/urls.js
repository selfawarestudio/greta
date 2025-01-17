import { defineSitemapEventHandler } from '#imports'

export default defineSitemapEventHandler(async () => {
  const client = useSanity()

  const slugsByType = await client.fetch(groq`{
    'page': *[_type == "page" && !(_id in [*[_id == "site"][0].homepage._ref])][].slug.current,
  }`)

  return [
    {
      loc: '/',
      priority: 1,
      changefreq: 'daily',
      _sitemap: 'pages',
    },
    ...slugsByType.page.map(pageSlug => ({
      loc: `/${pageSlug}`,
      priority: 0.9,
      changefreq: 'weekly',
      _sitemap: 'pages',
    })),
  ]
})
