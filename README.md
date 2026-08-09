# La Formation OFM

Site de formation façon Teachable : **sidebar de suivi fin à gauche** + **grande page blanche à droite** (vidéo + « Complete and Continue »). Découpé en **phases**. Progression sauvegardée localement dans le navigateur — aucun compte requis.

## Lancer en local

```bash
npm install
npm run dev
```

Ouvre l'URL affichée (par défaut http://localhost:5173).

## Build de production

```bash
npm run build      # génère dist/ (site statique, hébergeable partout)
npm run preview
```

## Où est le contenu

Tout est dans **`src/data/course.js`**, organisé ainsi :

```
course.sections[]        → les phases (Introduction, Phase 1, Phase 2, … Bonus, Réserver un Appel)
  section.lessons[]      → les leçons (titre, durée, vidéo, blocks)
    lesson.blocks[]      → le contenu de la leçon
```

### Renommer la formation

En haut de `course.js` : `title: 'La Formation OFM'` → mets le nom que tu veux.

### Ajouter une vidéo à une leçon

Sur la leçon, remplace `video: null` par :

```js
video: '/videos/ma-video.mp4',              // fichier local (dossier public/videos/)
// ou
video: 'https://www.youtube.com/embed/XXXX' // YouTube / Vimeo (lien "embed")
```

Tant que `video` est `null`, un placeholder « Vidéo à intégrer » s'affiche.

### Blocs de contenu disponibles

| Type | Usage |
|------|-------|
| `{ type: 'p', text }` | paragraphe (`**gras**` supporté) |
| `{ type: 'h3', text }` | sous-titre |
| `{ type: 'ul', items: [...] }` | liste à puces |
| `{ type: 'callout', variant, title, text }` | encadré (`tip` \| `warn` \| `script`) |
| `{ type: 'msg', text }` | exemple de message / phrase à dire |
| `{ type: 'media', label, note }` | placeholder d'image (à remplacer) |
| `{ type: 'todo', text }` | bloc "contenu à intégrer" (leçon en attente) |
| `{ type: 'image', src, caption }` | vraie image |

### Ajouter une image

1. Dépose l'image dans `public/images/`.
2. Remplace un bloc `{ type: 'media', ... }` par `{ type: 'image', src: '/images/xxx.png', caption: '...' }`.

## Marqueurs dans le contenu

- Leçons `clean: true` → le contenu original enseignait une pratique trompeuse ; j'ai mis une version propre (voir la note de livraison).
- Leçons `missing: true` → contenu que tu ne m'as pas encore fourni (bloc `todo` visible dans la leçon).
