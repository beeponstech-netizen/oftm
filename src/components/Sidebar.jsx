import { useNavigate } from 'react-router-dom'
import { course, totalLessons } from '../data/course.js'
import Check from './Check.jsx'
import PlayIcon from './PlayIcon.jsx'

export default function Sidebar({ isDone, doneCount, activeLessonId, onNavigate, drawerOpen }) {
  const navigate = useNavigate()
  const pct = totalLessons ? Math.round((doneCount / totalLessons) * 100) : 0

  const go = (id) => {
    navigate(`/lecon/${id}`)
    onNavigate?.()
  }

  return (
    <aside className={`sidebar ${drawerOpen ? 'open' : ''}`} id="sidebar">
      <div className="sidebar-progress">
        <div className="pct-line">
          <b>{pct}%</b>
          <span>Complete</span>
        </div>
        <div className="pbar">
          <div className="pbar-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {course.sections.map((sec) => (
        <div key={sec.id} className="nav-section">
          <div className="sec-title">{sec.title}</div>
          {sec.lessons.map((lesson) => {
            const done = isDone(lesson.id)
            const active = lesson.id === activeLessonId
            const stateClass = done ? 'done' : active ? 'current' : 'empty'
            return (
              <button
                key={lesson.id}
                className={`lesson-row ${active ? 'active' : ''}`}
                onClick={() => go(lesson.id)}
              >
                <span className={`state ${stateClass}`}>{done && <Check />}</span>
                <span className="lesson-mid">
                  <PlayIcon />
                  <span className="lesson-title">
                    {lesson.title}{' '}
                    {lesson.duration && <span className="dur">({lesson.duration})</span>}
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      ))}
    </aside>
  )
}
