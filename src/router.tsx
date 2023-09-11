import { createBrowserRouter } from "react-router-dom";

import { ProtectedRoute } from "./components";
import { Home, Login } from "./pages";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);
