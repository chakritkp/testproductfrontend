import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store/store.js";
import Produstlist from "./page/Produstlist.jsx";
import UploadProduct from "./page/UploadProduct.jsx";

import "./index.css";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Produstlist />,
  },
  {
    path: "/upload",
    element: <UploadProduct />,
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
