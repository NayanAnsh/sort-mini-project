import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Main from "./layouts/main";
import Home from "./layouts/home";
import { SocketProvider } from "./context/socketContext";
import { MouseTrackerProvider } from "./context/mouseTracker";
 
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Visualizer",
        element: <App />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SocketProvider>
      <MouseTrackerProvider>

    <RouterProvider router={router} />
      </MouseTrackerProvider>
    </SocketProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
