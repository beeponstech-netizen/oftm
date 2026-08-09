import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { findLesson, adjacentLessons } from '../data/course.js'
import Blocks from './Blocks.jsx'
import PlayIcon from './PlayIcon.jsx'

export default function LessonView({ isDone, setCompleted }) {
  const { lessonId } = useParams()
  const navigate = useNavigate()
  const lesson = findLesson(lessonId)

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [lessonId])

  if (!lesson) {
    return (
      <div className="lesson-wrap">
        <p>Leçon introuvable.</p>
      </div>
    )
  }

  const { prev, next } = adjacentLessons(lesson.id)

  const completeAndContinue = () => {
    setCompleted(lesson.id, true)
    if (next) navigate(`/lecon/${next.id}`)
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="lesson-wrap">
      <h1 className="lesson-title-h1">
        <PlayIcon size={24} />
        <span className="tv" style={{ display: 'none' }} />
        {lesson.title}
      </h1>

      {/* Zone vidéo */}
      <div className="video-box">
        {lesson.video ? (
          lesson.video.includes('youtube') || lesson.video.includes('vimeo') ? (
            <iframe src={lesson.video} title={lesson.title} allowFullScreen />
          ) : (
            <video src={lesson.video} controls />
          )
        ) : (
          <div className="video-ph">
            <div>
              <div className="play-badge">
                <PlayIcon size={26} />
              </div>
              <b>Vidéo à intégrer</b>
              <span>Ajoute `video: '/videos/…'` sur la leçon dans course.js</span>
            </div>
          </div>
        )}
      </div>

      {/* Complete and Continue central */}
      <div className="cac-center">
        <button className="cac cac-lg" onClick={completeAndContinue}>
          {isDone(lesson.id) && !next ? 'Terminé ✓' : 'Complete and Continue'}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {lesson.lead && <p className="lead">{lesson.lead}</p>}

      <Blocks blocks={lesson.blocks} />

      <div className="lesson-foot">
        <button className="cac" onClick={completeAndContinue}>
          {isDone(lesson.id) ? (next ? 'Suivant' : 'Terminé ✓') : 'Complete and Continue'}
        </button>
        <div className="spacer" />
        <button
          className={`foot-nav ${prev ? '' : 'disabled'}`}
          onClick={() => prev && navigate(`/lecon/${prev.id}`)}
        >
          ← Précédent
        </button>
        <button
          className={`foot-nav ${next ? '' : 'disabled'}`}
          onClick={() => next && navigate(`/lecon/${next.id}`)}
        >
          Suivant →
        </button>
      </div>
    </div>
  )
}
