import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import Login from './login';
import Main from './main'
import Register from './register'

const router = createBrowserRouter([
  {
    path: "*",
    element: <h1>404 Not Found !</h1>
  },
  {
    path: "/",
    element: <Main />
  },
  {
    path: "login",
    element: <Login />
  },
  {
    path: "register",
    element: <Register />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);