<script setup>
import * as queries from '~/lib/queries'

const { params } = useRoute()
const { data } = await useSanityData(queries.page, {
  slug: params.slug,
})

const { site } = defineProps(['site'])

useSeoMeta({
  title: data.value.seo.title,
  titleTemplate: `%s | ${site.seo.title}`,
  ogTitle: data.value.seo.ogTitle ?? site.seo.ogTitle,
  description: data.value.seo.description ?? site.seo.description,
  ogDescription: data.value.seo.ogDescription ?? site.seo.ogDescription,
  ogImage: data.value.seo.ogImage?.url ?? site.seo.ogImage?.url,
  twitterCard: 'summary_large_image',
})

definePageMeta({
  middleware: 'transition',
})
</script>

<template>
  <Page :site="site">
    <PageSectionList :sections="data.sections" />
  </Page>
</template>
