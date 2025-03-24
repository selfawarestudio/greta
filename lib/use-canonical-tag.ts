export function useCanonicalTag() {
  const route = useRoute()
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? process.env.SITE_URL
      : 'http://localhost:3000'

  useHead(() => ({
    link: [
      {
        rel: 'canonical',
        href: baseUrl + route.path,
      },
    ],
  }))
}
