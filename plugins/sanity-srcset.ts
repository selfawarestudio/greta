import imageUrlBuilder from '@sanity/image-url'

export default defineNuxtPlugin(() => {
  const builder = imageUrlBuilder(useSanity().client)

  function sanitySrcset(_id: string) {
    return [400, 650, 768, 1024, 1280, 1536]
      .map(
        width =>
          `${builder
            .image(_id)
            .dpr(2)
            .width(width)
            .auto('format')
            .fit('max')
            .url()} ${width}w`,
      )
      .join(',')
  }

  return {
    provide: { sanitySrcset },
  }
})
