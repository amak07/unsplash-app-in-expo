# Unsplash Demo App for Nutrien

Simple expo app that shares code between web and iOS platforms. Frontend interfaces with popular search API from Unsplash. Users can view the most recent trending photos or trigger a custom search for other interesting photos.

Features include:

1. Basic search
2. Simple pagination (Prev page or Next page)
3. Photo sorting by 'Newest' or 'Popularity'
4. Basic react-navigation setup
5. Simple "my favorites" list management
6. Basic unit tests using Cypress.io

Tech stack:

1. Expo (React Native + React)
2. React-Query (for data-fetching and caching)
3. Typescript
4. Nativebase (UI library)
5. Zustand (react state management)
6. Cypress.io (e2e ui testing)

Notes:

1. **Best experience for web: Chrome fullscreen, light mode**.
2. **Best experience for mobile: iphone 14 pro max, light mode**
3. Didn't get a chance to test across multiple devices for responsiveness BUT photo-grid is generally responsive on **web**.
4. Pagination loads 10 photos at a time, determined by the "page" query variable of the Unsplash API.
5. Sorting preference persists across search and favorites.

## Getting Started

First, install the required dependencies:

```bash
yarn install
```

Next, run the development server:

```bash
npx expo start
```

## Custom Test Suite

[Cypress.io](https://www.cypress.io/) is leveraged as the testing framework of choice. To run cypress locally:

```bash
yarn e2e
```

## Improvement thoughts and ideas.

- incorporate devtools for Zustand and React-Query which allows us to see state changes and other state mutations in logging.
- improve image performance for different image formats
- give users the ability to select trending collections for "quick search"
- provide autocomplete functionality in search input
- add a loader state between page renders and for new image renders
- move web app into Next.js for better navigation experience
