import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import App from './App';
import AboutPage from './pages/AboutPage';
import PokedexPage from './pages/PokedexPage';
import PokemonDetailsPage from './pages/PokemonDetailsPage';
import './index.css';

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <PokedexPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/pokemon/:name", element: <PokemonDetailsPage /> }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
