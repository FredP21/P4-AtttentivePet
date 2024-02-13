import React, { useContext, useEffect } from "react";
import ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";

import PropTypes from "prop-types";
import App from "./App";
import AuthProvider, { AuthContext } from "./context/AuthContext";
import CreateAd from "./pages/CreateAd";
import EditAd from "./pages/EditAd";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyAds from "./pages/MyAds";
import NotFound from "./pages/NotFound";
import PetFind from "./pages/PetFind";
import PetLost from "./pages/PetLost";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return children;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "perdu",
        element: <PetLost />,
      },
      {
        path: "trouve",
        element: <PetFind />,
      },
      {
        path: "inscription",
        element: <Register />,
      },
      {
        path: "profil",
        element: (
          <ProtectedRoute>
            <Profile />,
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "mes-annonces",
        element: (
          <ProtectedRoute>
            <MyAds />,
          </ProtectedRoute>
        ),
      },
      {
        path: "mes-annonces/:id",
        element: (
          <ProtectedRoute>
            <EditAd />,
          </ProtectedRoute>
        ),
      },
      {
        path: "creer-annonce",
        element: (
          <ProtectedRoute>
            <CreateAd />,
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
