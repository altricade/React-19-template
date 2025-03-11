import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../redux/features/counterSlice";
import { RootState } from "../redux/rootReducer";

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.counter.value);

  return (
    <div className="space-y-8">
      <section className="card">
        <h1 className="text-3xl font-bold mb-4">React 19 SSR Template</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Welcome to your new React 19 application with SSR, Redux Toolkit,
          Tailwind CSS, and more. This template provides a solid foundation for
          building modern web.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="https://react.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Learn React
          </a>
          <a
            href="https://redux-toolkit.js.org"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Redux Toolkit Docs
          </a>
        </div>
      </section>

      <section className="card">
        <h2 className="text-2xl font-bold mb-4">Redux Counter Example</h2>
        <div className="flex items-center justify-center space-x-4 py-4">
          <button
            onClick={() => dispatch(decrement())}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            -
          </button>
          <span className="text-2xl font-bold">{count}</span>
          <button
            onClick={() => dispatch(increment())}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            +
          </button>
        </div>
        <p className="text-center text-gray-600 dark:text-gray-300">
          This counter is managed by Redux Toolkit
        </p>
      </section>

      <section className="card">
        <h2 className="text-2xl font-bold mb-4">Features Included</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
          <li>React 19 with TypeScript</li>
          <li>Server-Side Rendering with Express</li>
          <li>Redux Toolkit with Redux Thunk</li>
          <li>React Router for client-side navigation</li>
          <li>Tailwind CSS for styling</li>
          <li>Webpack for bundling</li>
          <li>Docker for containerization</li>
          <li>Axios for API requests</li>
        </ul>
      </section>
    </div>
  );
};

export default HomePage;
