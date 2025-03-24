import { gsap } from 'gsap'
import choozy from 'choozy'
import defaultTransition from '~/transitions/default-transition'

export default defineNuxtRouteMiddleware((to, from) => {
  const { contextualTransition, isTransitioning, transitionTrigger } =
    useStore()

  const transitions = {
    DEFAULT: defaultTransition,
  }

  let fromDone = () => {}

  const transition = {
    name: 'page',
    mode: 'default',
    css: false,
    onBeforeLeave() {
      isTransitioning.value = true
    },
    onBeforeEnter: page => {
      gsap.set(page, { autoAlpha: 0 })
    },
    onLeave: (page, done) => {
      from.refs = {
        page,
        trigger: transitionTrigger.value,
        ...choozy(page),
      }

      fromDone = done
    },
    onEnter: (page, done) => {
      to.refs = {
        page,
        ...choozy(page),
      }

      const transitionFunction =
        transitions[contextualTransition.value] || transitions.DEFAULT

      contextualTransition.value = null
      transitionTrigger.value = null

      transitionFunction(from, to, () => {
        fromDone()
        done()
      })
    },
    onAfterEnter() {
      isTransitioning.value = false
    },
  }

  from.meta.pageTransition = transition
  to.meta.pageTransition = transition
})
