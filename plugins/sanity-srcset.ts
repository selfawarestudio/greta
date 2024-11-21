import imageUrlBuilder from '@sanity/image-url'

export default defineNuxtPlugin(() => {
  const builder = imageUrlBuilder(useSanity().client)
  function sanitySrcset(_id: string) {
    return [50, 100, 250, 400, 650, 768, 1024, 1280, 1536, 2048, 2560, 3072]
      .map(
        width =>
          `${builder
            .image(_id) //
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
