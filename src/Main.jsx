import React from "react";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import SerieTV from "./components/SerieTV.tsx";
import Film from "./components/Film.tsx";
import Tranding from "./components/Tranding.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/tv",
    element: <SerieTV />,
  },
  {
    path: "/movies",
    element: <Film />,
  },
  {
    path: "tranding",
    element: <Tranding />,
  },
  {
    path: "/favorites",
    element: <></>,
  },
]);
ReactDOM.cre;
