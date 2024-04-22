import { useRouteQuery } from '@vueuse/router'

export async function useSanityData(
  query: string,
  params?: Record<string, any>,
) {
  const preview = useRouteQuery('preview')
  const options =
    preview.value === 'true'
      ? {
          client: 'preview',
        }
      : undefined

  const res = await useSanityQuery(query, params, options)
  return res
}
