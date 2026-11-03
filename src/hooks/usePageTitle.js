import { useEffect } from "react"
import { club } from "../data/club"

export function usePageTitle(title) {
  useEffect(() => {
    document.title = `${title} · ${club.name}`
  }, [title])
}
