import { gsap } from 'gsap'

export default async function defaultTransition(from, to, done) {
  const tl = gsap.timeline()

  tl.set(to.refs.page, { autoAlpha: 0 })
    .to(from.refs.page, { autoAlpha: 0 })
    .add(() => window.scrollTo(0, 0))
    .to(to.refs.page, { autoAlpha: 1 })
    .add(done)
}
