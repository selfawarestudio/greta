export function resolvePath(slug, type) {
  return {
    page: `/${slug}`,
  }[type]
}
