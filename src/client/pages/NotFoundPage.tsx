import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="text-6xl font-bold text-primary-600 mb-4">404</div>
      <h1 className="text-2xl font-semibold mb-6">Page Not Found</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8 text-center max-w-md">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link to="/" className="btn-primary">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
