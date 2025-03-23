export type MediaObject =
  | {
      _type: 'image'
      _id: string
      width: number
      height: number
      url: string
      alt: string
      lqip: string
    }
  | {
      _type: 'mux.video'
      playbackId: string
      width: number
      height: number
    }

export type ObjectFit = 'cover' | 'contain'
