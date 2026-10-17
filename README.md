# RoboFriends

A small React app that loads a list of users and shows each one as a robot card, with a search box to filter them by name.

Live site: https://rakeshdmello.github.io/robofriends/

Robot pictures come from [RoboHash](https://robohash.org) and the user list from [JSONPlaceholder](https://jsonplaceholder.typicode.com).

## Requirements

- [Node.js](https://nodejs.org) 22.13 or later (or 24+). If you use nvm, run `nvm use` (the version is in `.nvmrc`).

## Getting started

```bash
npm install
npm start
```

This opens the app at http://localhost:3000/robofriends/. The page reloads automatically when you edit files in `src/`.

## Available scripts

| Command | What it does |
|---------|--------------|
| `npm start` (or `npm run dev`) | Runs the app in development mode with live reload |
| `npm test` | Runs the tests once |
| `npm run test:watch` | Runs the tests and re-runs them when files change |
| `npm run build` | Builds the production site into the `dist/` folder |
| `npm run preview` | Serves the built `dist/` folder locally, to check it before deploying |
| `npm run deploy` | Builds the site and publishes `dist/` to GitHub Pages (the `gh-pages` branch) |

## Project structure

```
index.html                 Page template (Vite entry point)
vite.config.js             Build, dev-server and test settings
public/                    Static files copied as-is (icons, manifest)
src/
  main.jsx                 Starts the React app
  containers/RoboApp.jsx   Loads the robots, handles search, loading and errors
  components/              Card, CardList, SearchBox, Scroll, ErrorBoundary
  robots.js                Sample robot data (used by the tests)
  *.test.jsx               Tests (Vitest + React Testing Library)
```

## Built with

- [React](https://react.dev) 19
- [Vite](https://vite.dev) for development and builds, and [Vitest](https://vitest.dev) for tests
- [Tachyons](https://tachyons.io) for styling
- [gh-pages](https://github.com/tschaub/gh-pages) for deployment

> This project was originally created with Create React App, which is no longer maintained. It was moved to Vite so it builds on current versions of Node.js.
