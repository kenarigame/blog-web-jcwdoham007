import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import './index.css';
import BlogDetail from './pages/BlogDetail';
import CreateBlog from './pages/CreateBlog';
import Homepage from './pages/Homepage';
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
    {
    path: "/blogs/:objectId",
    element: <BlogDetail />,
  },
  {
    path: "/create",
    element: <CreateBlog />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <>
    <RouterProvider router={router} />
    <Toaster />
  </>,
)
