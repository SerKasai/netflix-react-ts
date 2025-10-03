import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import SerieTV from "./components/SerieTV.tsx";
import Film from "./components/Film.tsx";
import Tranding from "./components/Tranding.tsx";
import MiaLista from "./components/MiaLista.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/serietv",
    element: <SerieTV />,
  },
  {
    path: "/film",
    element: <Film />,
  },
  {
    path: "intendenza",
    element: <Tranding />,
  },
  {
    path: "/lamialista",
    element: <MiaLista />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
