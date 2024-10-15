import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import RootLayout from "./layouts/RootLayout.tsx";
import Home from "./pages/Home.tsx";
import NewsDetail from "./pages/NewsDetail.tsx";
import NewsEachCategory from "./pages/NewsEachCategory.tsx";

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
    element: <div>Hello Ini Dashboard</div>,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
