import { useEffect, useState } from 'react'
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom'
import { useProgress } from './hooks/useProgress.js'
import { course, allLessons, findLesson, adjacentLessons } from './data/course.js'
import Sidebar from './components/Sidebar.jsx'
import LessonView from './components/LessonView.jsx'

function ResumeRedirect({ isDone }) {
  const resume = allLessons.find((l) => !isDone(l.id)) || allLessons[0]
  return <Navigate to={`/lecon/${resume.id}`} replace />
}

export default function App() {
  const { isDone, setCompleted, reset, doneCount } = useProgress()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const match = location.pathname.match(/^\/lecon\/(.+)$/)
  const activeLessonId = match ? match[1] : null
  const activeLesson = activeLessonId ? findLesson(activeLessonId) : null

  useEffect(() => {
    setDrawerOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [drawerOpen])

  const goHome = () => {
    const resume = allLessons.find((l) => !isDone(l.id)) || allLessons[0]
    navigate(`/lecon/${resume.id}`)
  }

  const onReset = () => {
    if (doneCount === 0) {
      window.alert('Aucune progression à réinitialiser pour le moment.')
      return
    }
    if (window.confirm('Réinitialiser toute ta progression ? Cette action est définitive.')) {
      reset()
    }
  }

  const completeAndContinue = () => {
    if (!activeLesson) return
    setCompleted(activeLesson.id, true)
    const { next } = adjacentLessons(activeLesson.id)
    if (next) navigate(`/lecon/${next.id}`)
  }

  return (
    <div className="app">
      {/* Barre du haut */}
      <header className="topbar">
        <div className="topbar-left">
          <button className="icon-btn menu-btn" aria-label="Menu" onClick={() => setDrawerOpen(true)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <button className="icon-btn" aria-label="Accueil" onClick={goHome}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M3 11l9-7 9 7M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className="icon-btn" aria-label="Réinitialiser" onClick={onReset}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 15.5A3.5 3.5 0 108.5 12 3.5 3.5 0 0012 15.5z" stroke="currentColor" strokeWidth="1.7" />
              <path d="M19.4 13a7.4 7.4 0 00.06-2l1.5-1.2-1.5-2.6-1.9.6a7.5 7.5 0 00-1.7-1l-.3-2h-3l-.3 2a7.5 7.5 0 00-1.7 1l-1.9-.6-1.5 2.6L6.5 11a7.4 7.4 0 000 2l-1.5 1.2 1.5 2.6 1.9-.6a7.5 7.5 0 001.7 1l.3 2h3l.3-2a7.5 7.5 0 001.7-1l1.9.6 1.5-2.6z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
            </svg>
          </button>
          <span className="topbar-course">{course.title}</span>
        </div>

        <div className="topbar-right">
          {activeLesson && (
            <button className="cac" onClick={completeAndContinue}>
              <span className="txt-long">Complete and Continue&nbsp;</span>
              <span aria-hidden>›</span>
            </button>
          )}
        </div>
      </header>

      <div className="body">
        <Sidebar
          isDone={isDone}
          doneCount={doneCount}
          activeLessonId={activeLessonId}
          onNavigate={() => setDrawerOpen(false)}
          drawerOpen={drawerOpen}
        />
        <div className={`backdrop ${drawerOpen ? 'show' : ''}`} onClick={() => setDrawerOpen(false)} />

        <main className="main">
          <Routes>
            <Route path="/" element={<ResumeRedirect isDone={isDone} />} />
            <Route
              path="/lecon/:lessonId"
              element={<LessonView isDone={isDone} setCompleted={setCompleted} />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <div className="teach-tag">
            <div className="box">🎓 Formation OFM · progression sauvegardée sur cet appareil</div>
          </div>
        </main>
      </div>
    </div>
  )
}
