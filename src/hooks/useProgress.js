import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'oftom.progress.v1'

/**
 * Progression sauvegardée localement (localStorage) — aucun compte requis.
 * On stocke un simple ensemble d'IDs de leçons terminées : { "1-2": true, ... }
 */
function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function useProgress() {
  const [done, setDone] = useState(load)

  // Persiste à chaque changement
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(done))
    } catch {
      /* quota plein / mode privé : on ignore silencieusement */
    }
  }, [done])

  const isDone = useCallback((lessonId) => !!done[lessonId], [done])

  const toggle = useCallback((lessonId) => {
    setDone((prev) => {
      const next = { ...prev }
      if (next[lessonId]) delete next[lessonId]
      else next[lessonId] = true
      return next
    })
  }, [])

  const setCompleted = useCallback((lessonId, value) => {
    setDone((prev) => {
      if (!!prev[lessonId] === value) return prev
      const next = { ...prev }
      if (value) next[lessonId] = true
      else delete next[lessonId]
      return next
    })
  }, [])

  const reset = useCallback(() => setDone({}), [])

  const doneCount = Object.keys(done).length

  return { isDone, toggle, setCompleted, reset, doneCount, done }
}
