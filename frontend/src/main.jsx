import React, { useContext, useEffect } from "react";
import ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";

import PropTypes from "prop-types";
import App from "./App";
import AuthContextProvider, { AuthContext } from "./context/AuthContext";
import Archives from "./pages/Archives";
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
import Users from "./pages/Users";
import WaitingAds from "./pages/WaitingAds";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/connexion");
    }
  }, [isAuthenticated, navigate, isLoading]);

  if (isLoading || !isAuthenticated) {
    return null;
  }

  return children;
}
function AdminRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated, user, isLoading } = useContext(AuthContext);

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user.is_admin !== 1)) {
      navigate("/non-admin");
    }
  }, [isAuthenticated, user, navigate, isLoading]);

  if (isLoading || !isAuthenticated || user.is_admin !== 1) {
    return null;
  }

  return children;
}

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

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
        path: "connexion",
        element: <Login />,
      },
      {
        path: "non-admin",
        element: (
          <ProtectedRoute>
            <NotFound />
          </ProtectedRoute>
        ),
      },
      {
        path: "profil",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "mes-annonces",
        element: (
          <ProtectedRoute>
            <MyAds />
          </ProtectedRoute>
        ),
      },
      {
        path: "mes-annonces/:id",
        element: (
          <ProtectedRoute>
            <EditAd />
          </ProtectedRoute>
        ),
      },
      {
        path: "creer-annonce",
        element: (
          <ProtectedRoute>
            <CreateAd />
          </ProtectedRoute>
        ),
      },
      {
        path: "en-attente",
        element: (
          <AdminRoute>
            <WaitingAds />
          </AdminRoute>
        ),
      },
      {
        path: "archives",
        element: (
          <AdminRoute>
            <Archives />
          </AdminRoute>
        ),
      },
      {
        path: "utilisateurs",
        element: (
          <AdminRoute>
            <Users />
          </AdminRoute>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
