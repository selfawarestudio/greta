<script setup>
import * as queries from '~/lib/queries'

useCanonicalTag()

const { data } = await useSanityData(queries.site)
</script>

<template>
  <div>
    <SiteHeader :header="data.header" />
    <NuxtPage :site="data" />
  </div>
</template>
