import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const behavior = reduce ? "auto" : "smooth"

    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior })
      return undefined
    }

    const timer = window.setTimeout(() => {
      const node = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (node) node.scrollIntoView({ behavior, block: "start" })
      else window.scrollTo({ top: 0, left: 0, behavior })
    }, 40)

    return () => window.clearTimeout(timer)
  }, [pathname, hash])

  return null
}
