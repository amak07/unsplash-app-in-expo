# Eco Unsplash App

Eco Unsplash App is a simple react frontend that interfaces with the popular photo search API from Unsplash. Users can view the most recent trending photos or trigger a custom search for other interesting photos.

### Recommended production URL

Vist the deployed application (hosted on Vercel) at [https://unsplash-app-rho.vercel.app/](https://unsplash-app-rho.vercel.app/).

Features include:

1. Basic search
2. Simple pagination
3. Photo sorting by 'Newest' or 'Likes'
4. Photo viewer (modal carousel)

Tech stack:

1. Next.js (react SSR framework)
2. React-Query (for data-fetching and caching)
3. Typescript
4. Tailwind CSS (responsive CSS)
5. Zustand (react state management)

Notes:

1. **Best experience on web (Chrome) desktop, light mode**.
2. Responsive layout from mobile to large screens
3. Dark mode addressed
4. Pagination loads 10 photos at a time, determined by the "page" query variable of the Unsplash API
5. Test suite added
6. API data caching enabled
7. Prefetches images and generates a static (landing) page
8. Basic a11y, SEO, and performance checks pass Chrome's Lighthouse audit

## Getting Started

First, install the required dependencies:

```bash
yarn install
```

Next, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To run the performant production build locally:

```bash
yarn build
yarn start
```

## Custom Test Suite

[Cypress.io](https://www.cypress.io/) is leveraged as the testing framework of choice. To run cypress locally:

```bash
yarn e2e
```

## Easy CI/CD Pipeline with Vercel

Eco Unsplash App's production build is current hosted on Vercel.
Process:

- push new commit(s) to `main` branch
- Github triggers a webhook that lets Vercel know a new build is needed
- A new build, incorporating the latest commit(s), is deployed
- Default deployed stage is tied to code pushed onto the `main` branch but additional stages can easily be added which correspond to code pushed to another branch, say, `staging`.

## Eco Unsplash App TODO

- incorporate devtools for Zustand and React-Query which allows us to see state changes and other state mutations in logging.
- improve image performance for different image formats
- give users the ability to select trending collections for "quick search"
- provide autocomplete functionality in search input
- add a loader state between page renders
