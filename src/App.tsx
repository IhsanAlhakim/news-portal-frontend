import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
import SearchedNews from "./pages/SearchedNews.tsx";

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
      {
        path: "news/search",
        element: <SearchedNews />,
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
        path: "/dashboard/news/edit/:newsId",
        element: <EditNews />,
      },
    ],
  },
  {
    path: "/dashboard/login",
    element: <Login />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
