# Interactive 3D Video Landing Page

A modern, highly interactive landing page built with React, Vite, Tailwind CSS, and Framer Motion. This project features a unique cinematic experience integrating a custom interactive video player and an ambient, GPU-accelerated 3D floating fish model that traverses the screen seamlessly.

## Features

- **Interactive Cinematic Video**: A custom video player component that fluidly expands into a focused modal using `framer-motion` layout animations.
- **Ambient 3D Model**: Integrates Google's `<model-viewer>` to render an animated 3D fish traversing the viewport in an organic Lissajous (figure-8) trajectory, completely unblocking user interactions.
- **Modern Tech Stack**: 
  - [React 19](https://react.dev/)
  - [Vite](https://vitejs.dev/)
  - [Tailwind CSS 4](https://tailwindcss.com/)
  - [Framer Motion](https://motion.dev/)
  - `<model-viewer>`
- **Responsive Design**: Carefully crafted for both desktop and mobile viewports.

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd <your-repo-name>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the local URL provided in your terminal (typically `http://localhost:3000`).

## Build for Production

To create a production-ready build:

```bash
npm run build
```

This will generate a `dist/` directory containing the minified and optimized static assets, ready to be deployed to any static hosting provider (Vercel, Netlify, GitHub Pages, etc.).

## License

This project is open-source and available under the MIT License.
