# Store App

A simple, responsive React web app that displays products from a fake store API. It allows users to view products, sort them by category, view product details on a separate page, and load more products with infinite scroll. This app is mobile responsive and adjusts to different screen sizes.

## Features

- **Product List**: Displays a set of 4 products with images and names, and links to the product detail page.
- **Responsive Layout**: The product list is displayed in 4 columns on desktop screens, and switches to 2 columns on mobile.
- **Product Details**: When a product is clicked, users are taken to a product details page.
- **Infinite Scroll**: More products are loaded as the user scrolls to the bottom of the page.
- **Sort by Category**: Products can be sorted by category (ascending or descending).
- **Lazy Loading**: Product images are lazily loaded as the user scrolls.

## Installation

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/jannytechservice/store-app
   cd store-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the app:
   ```
   npm start
   ```

The app will start and can be accessed at http://localhost:3000.

## Available Scripts

- `npm start`: Starts the development server and opens the app in your browser.
- `npm run build`: Builds the app for production to the build folder.
- `npm run lint`: Lints the source files.
- `npm run lint:fix`: Lints and auto-fixes source files.
- `npm run format`: Formats the source code using Prettier.

## Libraries Used

- `React`: A JavaScript library for building user interfaces.
- `Material UI`: For responsive grid layout and UI components.
- `Axios`: For making HTTP requests to the Fake Store API.
- `React Router`: For routing between pages (Home and Product Details).
- `Infinite Scroll`: For dynamically loading more products when the user scrolls.
- `React Lazy Load Image Component`: For lazy loading of images to improve performance.
- `Prettier`: For consistent code formatting.
- `ESLint`: For linting the code.
