import { useRef, useState, useEffect } from 'react'

export function useScrollAnimation(threshold = 0.15) {
  const ref = useRef<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            obs.disconnect()
          }
        })
      },
      { threshold },
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return { ref, isVisible }
}

export default useScrollAnimation
