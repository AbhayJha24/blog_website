import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Login from './login';
import Main from './main'
import Register from './register'
import WriteBlog from "./writeBlog";
import Blog from "./blog";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path= "*" element= {<h1>404 Not Found !</h1>} />
        <Route path= "/" element= { <Main />} />
        <Route path= "/login" element= {<Login />} />
        <Route path= "/register" element= {<Register />} />
        <Route path= "/writeBlogs" element= {<WriteBlog />} />
        <Route path= "/blog/:id" element= {<Blog />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);