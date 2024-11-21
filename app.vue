<script setup>
import * as queries from '~/utils/queries'

const { data } = await useSanityData(queries.site)
</script>

<template>
  <div>
    <SiteHeader :header="data.header" />
    <NuxtPage :site="data" />
    <SiteFooter :footer="data.footer" />
  </div>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  /* @font-face {
    font-family: 'Example Font';
    src: url('~/assets/Example.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  } */

  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-family: theme('fontFamily.sans');
    font-size: 1.4rem;
  }
}

@layer components {
}

@layer utilities {
  .h-screen-s {
    height: 100vh;
    height: 100svh;
  }

  .h-screen-l {
    height: 100vh;
    height: 100lvh;
  }

  .grid-main {
    @apply grid grid-cols-12 gap-x-20;
  }

  .px-main {
    @apply px-15 m:px-25;
  }

  .mt-main {
    @apply mt-24 m:mt-48;

    &:first-child {
      @apply mt-24;
    }
  }

  .mb-main {
    @apply mb-24 m:mb-48;
  }

  .DEBUG {
    @apply border-1 border-red bg-red/10;
  }
}
</style>
