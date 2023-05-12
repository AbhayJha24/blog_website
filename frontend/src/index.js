import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import Login from './login';
import Main from './main'
import Register from './register'
import WriteBlog from "./writeBlog";
import Blog from "./blog";

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
  },
  {
    path: "writeblogs",
    element: <WriteBlog />
  },
  {
    path: "blog/:id",
    element: <Blog />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);