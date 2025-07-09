# Hebrew Pa'al Verb Table (Vue Edition)

This version of the project uses Vue 3 to power an interactive, mobile-friendly interface for browsing Hebrew Pa'al verbs in the present tense.

## Features
- Table of verbs with shoresh, English meaning, and conjugations
- Clickable shoreshes open a detailed view
- Data loaded from external JSON
- Responsive layout for mobile use

## Files
- `index.html` - HTML file with Vue app container and structure
- `style.css` - Styling including RTL Hebrew support
- `app.js` - Vue 3 app logic for loading and displaying data
- `data.json` - External data source
- `.github/workflows/deploy.yml` - GitHub Actions deployment to Pages

## Deployment
- Push `main` to deploy to root (`/`)
- Push `dev` to deploy to `/preview`

View live: https://ygoldberg.github.io/hebrew-verb-table/
