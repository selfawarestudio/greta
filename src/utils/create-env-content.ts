export function createEnvContent(
  sanityProjectTitle: string,
  sanityProjectId: string,
  sanityProjectToken: string,
) {
  const currentDate = new Date().toISOString().slice(0, 10)
  return (
    `COMPATIBILITY_DATE=${currentDate}\n` +
    `SANITY_STUDIO_PROJECT_TITLE="${sanityProjectTitle}"\n` +
    `SANITY_STUDIO_PROJECT_ID=${sanityProjectId}\n` +
    `SANITY_STUDIO_DATASET=production\n` +
    `SANITY_STUDIO_API_VERSION=${currentDate}\n` +
    `SANITY_STUDIO_API_TOKEN=${sanityProjectToken}\n` +
    `SANITY_STUDIO_SLUG_INPUT_URL_PREFIX=\n` +
    `SANITY_STUDIO_PROD_PREVIEW_URL=\n` +
    `SITE_URL=\n` +
    `GTAG_ID=\n`
  )
}
