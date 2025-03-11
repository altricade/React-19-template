import React from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container-custom flex-grow py-8">{children}</main>
      <footer className="bg-gray-100 dark:bg-gray-800 py-6">
        <div className="container-custom">
          <p className="text-center text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} React 19 SSR Template
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
