export function useViewport() {
  const { $viewport } = useNuxtApp()
  return $viewport
}
