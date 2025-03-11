# React 19 SSR Template

A modern production-ready React 19 template with Server-Side Rendering, Redux Toolkit, TypeScript, Tailwind CSS, and Docker support for both development and production environments.

## Features

- **React 19**: Utilizing the latest React features including the new concurrent rendering engine
- **TypeScript**: Full type safety throughout the application with strict mode enabled
- **Server-Side Rendering (SSR)**: Optimized loading experience and SEO benefits
- **Redux Toolkit**: State management with Redux Thunk for async operations
- **React Router**: Client-side navigation with SSR support
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Webpack**: Separate optimized configurations for development and production
- **Environment Variables**: Support for environment-specific configurations
- **Docker**: Multi-environment containerization with development and production modes
- **Express**: Backend server for SSR and API endpoints
- **Axios**: Type-safe HTTP client for API requests

## Requirements

- Node.js 16.x or higher
- npm 7.x or higher
- Docker (optional, for containerization)

## Getting Started

### Development

To start the development server:

```bash
# Install dependencies
npm install

# Create environment files from examples
cp .env.example .env
cp .env.development.example .env.development

# Start development server
npm run dev
```

The application will be available at http://localhost:3000 with hot reloading for both client and server code.

### Production Build

To create a production build:

```bash
# Create production environment file if needed
cp .env.production.example .env.production

# Build the client and server bundles
npm run build

# Start the production server
npm start
```

### Docker

To run the application using Docker:

#### Development Mode

```bash
docker-compose up development
```

#### Production Mode

```bash
docker-compose up production
```

Or build and run specific images directly:

```bash
# Build with specific environment
docker build --build-arg NODE_ENV=development -t react-ssr-app:dev .

# Run the container
docker run -p 3000:3000 -d react-ssr-app:dev
```

### Environment Variables

The application uses environment variables for configuration. Example files are provided:

- `.env.example`: Base environment variables
- `.env.development.example`: Development-specific variables
- `.env.production.example`: Production-specific variables

Copy these examples and modify them for your specific needs.

## Project Structure

```
├── dist/                     # Compiled output
├── src/
│   ├── client/               # Client-side code
│   │   ├── components/       # React components
│   │   ├── pages/            # Page components
│   │   ├── redux/            # Redux store, slices, and thunks
│   │   ├── App.tsx           # Main App component
│   │   ├── index.html        # HTML template
│   │   ├── index.tsx         # Client entry point
│   │   └── styles.css        # Global styles with Tailwind
│   ├── server/               # Server-side code
│   │   └── index.ts          # Express server for SSR
│   └── types/                # TypeScript types and declaration files
│       ├── dotenv-webpack.d.ts   # Type declarations for dotenv-webpack
│       └── webpack-node-externals.d.ts  # Type declarations for webpack-node-externals
├── webpack/                  # Webpack configuration files
│   ├── common.ts             # Common webpack configuration
│   ├── client.common.ts      # Common client webpack configuration
│   ├── client.dev.ts         # Development client webpack configuration
│   ├── client.prod.ts        # Production client webpack configuration
│   ├── server.common.ts      # Common server webpack configuration
│   ├── server.dev.ts         # Development server webpack configuration
│   └── server.prod.ts        # Production server webpack configuration
├── .env.example              # Example environment variables
├── .env.development.example  # Example development environment variables
├── .env.production.example   # Example production environment variables
├── .gitignore                # Git ignore file
├── Dockerfile                # Docker configuration
├── docker-compose.yml        # Docker Compose configuration
├── package.json              # Project dependencies and scripts
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── webpack.client.dev.js     # Client development entry point
├── webpack.client.prod.js    # Client production entry point
├── webpack.server.dev.js     # Server development entry point
└── webpack.server.prod.js    # Server production entry point
```

## Scripts

- `npm run dev`: Start development server with hot reloading using concurrently
- `npm run dev:client`: Start client development server only
- `npm run dev:server`: Start server development server only
- `npm start`: Run the production build
- `npm run build`: Build both client and server for production
- `npm run build:dev`: Build both client and server for development
- `npm run build:client`: Build client for production
- `npm run build:client:dev`: Build client for development
- `npm run build:server`: Build server for production
- `npm run build:server:dev`: Build server for development
- `npm run docker:build:dev`: Build Docker image for development
- `npm run docker:build:prod`: Build Docker image for production
- `npm run docker:run:dev`: Run Docker container in development mode
- `npm run docker:run:prod`: Run Docker container in production mode

## Performance Optimizations

- Server-side rendering for faster initial load and improved SEO
- Environment-specific webpack configurations for optimized development and production builds
- Code splitting and tree shaking for minimized bundle sizes
- Terser and CSS minimizer plugins for production builds
- Efficient Redux store with Redux Toolkit and selective state management
- Tailwind CSS for reduced CSS footprint with PurgeCSS in production
- Docker multi-stage builds for optimized container sizes
- TypeScript for compile-time error checking and improved code quality
- Hot module replacement (HMR) for faster development iterations

## Environment-Specific Configurations

This template provides separate configurations for development and production environments:

### Development
- Source maps for easier debugging
- Hot module replacement for rapid development
- Minimal optimization for faster builds
- Development-specific environment variables

### Production
- Minified and optimized bundles
- Aggressive code splitting and tree shaking
- Reduced bundle sizes through dead code elimination
- Content hashing for cache control
- Production-specific environment variables

## License

MIT
