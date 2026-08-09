import React from 'react'

/**
 * Mini-parseur de texte : supporte **gras** et [libellé](url).
 * Volontairement simple et sûr — pas d'injection HTML, on ne produit que des
 * éléments React. Suffit largement pour le contenu de la formation.
 */
export function renderRich(text) {
  if (!text) return null

  // 1) découpe sur les liens markdown
  const linkRe = /\[([^\]]+)\]\(([^)]+)\)/g
  const nodes = []
  let last = 0
  let m
  let key = 0

  while ((m = linkRe.exec(text)) !== null) {
    if (m.index > last) nodes.push(...renderBold(text.slice(last, m.index), key++))
    const href = m[2]
    const external = /^https?:\/\//.test(href)
    nodes.push(
      <a
        key={`lnk-${key++}`}
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer noopener' : undefined}
      >
        {m[1]}
      </a>,
    )
    last = m.index + m[0].length
  }
  if (last < text.length) nodes.push(...renderBold(text.slice(last), key++))
  return nodes
}

function renderBold(segment, baseKey) {
  const parts = segment.split(/(\*\*[^*]+\*\*)/g)
  return parts
    .filter((p) => p !== '')
    .map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={`b-${baseKey}-${i}`}>{part.slice(2, -2)}</strong>
      }
      return <React.Fragment key={`t-${baseKey}-${i}`}>{part}</React.Fragment>
    })
}
