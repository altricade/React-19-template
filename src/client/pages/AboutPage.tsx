import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div className="card">
      <h1 className="text-3xl font-bold mb-6">About This Template</h1>
      <div className="space-y-6 text-gray-600 dark:text-gray-300">
        <p>
          This project is a modern React 19 application template built with
          TypeScript and configured for server-side rendering (SSR) with
          Express. It includes a comprehensive set of tools and libraries to
          help you build production-ready web applications.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Technical Stack
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">
              Frontend
            </h3>
            <ul className="list-disc list-inside space-y-2">
              <li>React 19 (with new concurrent features)</li>
              <li>TypeScript for type safety</li>
              <li>Redux Toolkit for state management</li>
              <li>React Router for navigation</li>
              <li>Tailwind CSS for styling</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">
              Backend & Build Tools
            </h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Express for the server-side rendering</li>
              <li>Webpack for bundling</li>
              <li>Docker for containerization</li>
              <li>Axios for API requests</li>
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Getting Started
        </h2>
        <p>To get started with development, run:</p>
        <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md overflow-x-auto mb-4">
          <code>npm run dev</code>
        </pre>

        <p>For production builds:</p>
        <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md overflow-x-auto mb-4">
          <code>npm run build && npm start</code>
        </pre>

        <p>For Docker deployment:</p>
        <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md overflow-x-auto">
          <code>npm run docker:build && npm run docker:run</code>
        </pre>
      </div>
    </div>
  );
};

export default AboutPage;
