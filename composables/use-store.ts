export const useStore = () => {
  const contextualTransition = useState('contextualTransition', () => null)
  const isTransitioning = useState('isTransitioning', () => false)
  const transitionTrigger = useState('transitionTrigger', () => null)

  return {
    contextualTransition,
    isTransitioning,
    transitionTrigger,
  }
}
