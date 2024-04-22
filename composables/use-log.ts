import type { WatchOptions } from 'vue'

export function useLog(
  refOrReactive: any,
  { immediate = true, deep = false }: Partial<WatchOptions>,
) {
  // Setup a watcher on the provided reactive reference or state
  watch(
    refOrReactive,
    newValue => {
      console.log(toRaw(newValue))
    },
    { immediate, deep },
  )

  // If the provided value is a ref, log its initial value
  if (isRef(refOrReactive) && immediate) {
    console.log(refOrReactive.value)
  }
}
