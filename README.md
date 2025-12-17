# Data Dungeon — juego para preparar el 2º examen de Python

Juego tipo quiz por niveles para repasar (de forma rápida y entretenida) los conceptos del **2º examen de Python**.
Incluye preguntas con opciones, explicación al responder y pistas, además de sistema de vida/puntuación y un modo de estudio.

## Qué se verá (resumen)

- **Fundamentos + NumPy**: arrays, `shape`/`size`, vectorización, slicing y broadcasting.
- **Estadística y visualización**: media/mediana/moda, outliers, histogramas, boxplots, scatterplots, cuartiles e imputación.
- **Pandas**: DataFrame, `head()`, detección de nulos (`isna()`), filtros, `groupby()` y fechas con `to_datetime()`.

## Ejecutar en local

**Requisito:** Node.js

1. Instalar dependencias:
   `npm install`
2. Arrancar en modo desarrollo:
   `npm run dev`

## Build / preview

- Build:
  `npm run build`
- Preview:
  `npm run preview`

## Ranking global (Supabase)

El leaderboard ahora se guarda en una tabla de Supabase llamada `scores` con columnas `username (text)`, `score (int)` y `date (timestamp/text)`. Para activarlo:

1. Crea en Supabase un proyecto y una tabla `scores` con RLS permitiendo `select` e `insert` anónimos solo en esa tabla.
2. Añade en el repo (Settings → Secrets and variables → Actions) los secretos:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Localmente, crea un `.env` con esas mismas variables para probar `npm run dev`.

Si las variables no están configuradas, el juego usará un leaderboard local en `localStorage`.
