<script setup>
import * as queries from '~/utils/queries'

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
</script>

<template>
  <PageSectionList :sections="data.sections" />
</template>
