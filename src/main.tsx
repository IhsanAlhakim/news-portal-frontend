import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import RootLayout from "./layouts/RootLayout.tsx";
import Home from "./pages/Home.tsx";
import NewsDetail from "./pages/NewsDetail.tsx";
import NewsEachCategory from "./pages/NewsEachCategory.tsx";
import AdminLayout from "./layouts/AdminLayout.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Login from "./pages/Login.tsx";
import ManageNews from "./pages/ManageNews.tsx";
import AddNews from "./pages/AddNews.tsx";
import EditNews from "./pages/EditNews.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "news/:category",
        element: <NewsEachCategory />,
      },
      {
        path: "news/:category/:newsId",
        element: <NewsDetail />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/dashboard/news",
        element: <ManageNews />,
      },
      {
        path: "/dashboard/news/add",
        element: <AddNews />,
      },
      {
        path: "/dashboard/news/edit",
        element: <EditNews />,
      },
    ],
  },
  {
    path: "/dashboard/login",
    element: <Login />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
