<script setup>
import * as queries from '~/utils/queries'

const { params } = useRoute()
const { data } = await useSanityData(queries.page, {
  slug: params.slug,
})

const { site } = defineProps(['site'])

// useSeoMeta({
//   title: data.value.title,
//   titleTemplate: `%s | ${site.documentTitle}`,
//   ogTitle: data.value.ogTitle ?? site.ogTitle,
//   description: data.value.metaDescription ?? site.metaDescription,
//   ogDescription: data.value.ogDescription ?? site.ogDescription,
//   ogImage: data.value.ogImage?.url ?? site.ogImage?.url,
//   twitterCard: 'summary_large_image',
// })
</script>

<template>
  <PageSectionList :sections="data.sections" />
</template>
