import { renderRich } from '../lib/richText.jsx'

const calloutIcon = { tip: '💡', warn: '⚠️', script: '💬' }
const calloutDefaultTitle = { tip: 'Conseil', warn: 'Attention', script: 'Exemple' }

function Callout({ variant = 'tip', title, text }) {
  return (
    <div className={`callout ${variant}`}>
      <div className="ico">{calloutIcon[variant] || '💡'}</div>
      <div className="body">
        <b>{title || calloutDefaultTitle[variant]}</b>
        <span>{renderRich(text)}</span>
      </div>
    </div>
  )
}

/** Rend un tableau de blocs de contenu en JSX. */
export default function Blocks({ blocks }) {
  return (
    <div className="prose">
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'h2':
            return <h2 key={i}>{renderRich(b.text)}</h2>
          case 'h3':
            return <h3 key={i}>{renderRich(b.text)}</h3>
          case 'p':
            return <p key={i}>{renderRich(b.text)}</p>
          case 'ul':
            return (
              <ul key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>{renderRich(it)}</li>
                ))}
              </ul>
            )
          case 'callout':
            return <Callout key={i} {...b} />
          case 'msg':
            return (
              <div key={i} className="msg">
                {renderRich(b.text)}
              </div>
            )
          case 'todo':
            return (
              <div key={i} className="todo">
                <span className="ico">🚧</span>
                <span>{renderRich(b.text)}</span>
              </div>
            )
          case 'image':
            return (
              <figure key={i} style={{ margin: 0 }}>
                <img
                  src={import.meta.env.BASE_URL + b.src}
                  alt={b.caption || ''}
                  style={{ width: '100%', borderRadius: 14, border: '1px solid var(--border-soft)' }}
                />
                {b.caption && (
                  <figcaption
                    style={{ color: 'var(--text-faint)', fontSize: 12.5, marginTop: 8, textAlign: 'center' }}
                  >
                    {b.caption}
                  </figcaption>
                )}
              </figure>
            )
          case 'media':
            return (
              <div key={i} className="media-ph">
                <div>
                  <div className="ico">🖼️</div>
                  <b>{b.label || 'Visuel à intégrer'}</b>
                  <span>{b.note || 'Placeholder — remplace par une image quand tu me l’envoies'}</span>
                </div>
              </div>
            )
          default:
            return null
        }
      })}
    </div>
  )
}
