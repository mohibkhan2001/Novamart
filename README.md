React E-Commerce Store (Work in Progress)

This project is a modern, responsive e-commerce store built with React. It features dynamic product listings, detailed product views, smooth animations, and seamless client-side routing. The store fetches data from a public API and displays curated top-selling products with real-time star ratings and discounts.

Project Overview

This React e-commerce application is designed to provide a clean and user-friendly shopping experience. It showcases a selection of top products with features like:

Product cards displaying images, names, prices, and discount badges.

Accurate star ratings using full, half, and empty star icons.

Animated entrance effects for an engaging UI.

Clickable product cards navigating to detailed product pages.

Responsive layouts optimized for desktops, tablets, and mobiles.

Integration with React Router for smooth client-side navigation.

The product data is fetched from a dummy JSON API using a custom React hook to optimize performance and manage state.

Current Status

⚠️ This project is actively under development. Core features like product listing, rating display, and navigation are implemented. Upcoming features include full product detail pages, cart management, search functionality, and payment integration.

Features Implemented

Custom hook to fetch top products by predefined IDs.

Product cards with image fallback and discount badge.

Dynamic star rating system showing full, half, and empty stars.

Responsive grid layout using Tailwind CSS.

Entrance animations powered by Framer Motion.

Product navigation via React Router <Link>.

Add to cart button with isolated click handling.

Tech Stack

React (Functional Components & Hooks)

React Router (v6) for client-side routing

Axios for API calls

Framer Motion for animations

Tailwind CSS for styling

React Icons for UI icons

Project Structure

src/components: Reusable UI components like product cards and category sections.

src/hooks: Custom hooks for fetching and managing data.

src/assets: Images and static assets.

src/App.jsx: Main application container with routing setup.

src/index.jsx: Application entry point.

Getting Started

Clone the repository to your local machine.

Install dependencies using npm install or yarn install.

Run the development server with npm start or yarn start.

Open your browser at http://localhost:3000 to see the app in action.

Future Plans

Detailed product pages with complete descriptions and reviews.

Shopping cart with state management.

Search, filtering, and sorting functionality.

User authentication and profile management.

Payment gateway integration.

Responsive skeleton loaders and improved UX during data fetching.

Unit and integration tests for reliability.

Contribution

Contributions are welcome! Feel free to open issues or submit pull requests to help improve this project.

Credits

Product images are sourced from Unsplash
 — a fantastic free photo resource.

Product data and API used in this project are provided by DummyJSON
 — a free fake REST API for testing and prototyping.

License

This project is licensed under the MIT License.
