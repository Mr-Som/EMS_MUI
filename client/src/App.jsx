import React, { Suspense, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import axios from "axios";

// Lazy load components
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout.jsx"));
const SignInPage = React.lazy(
  () => import("./views/authentication/sign-in/signin.jsx")
);
const SignUpPage = React.lazy(
  () => import("./views/authentication/sign-up/signup.jsx")
);

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const checkSession = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_API_URL}/api/auth/check-session`,
        { withCredentials: true }
      );
      console.log("Check session response:", response.data);
      setIsAuthenticated(response.data.success);
    } catch (error) {
      console.error(
        "Check session error:",
        error.response?.data || error.message
      );
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  if (isAuthenticated === null) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          position: "fixed",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width: "100vw",
              position: "fixed",
            }}
          >
            <CircularProgress />
          </Box>
        }
      >
        <Routes>
          <Route
            path="/signin"
            element={
              isAuthenticated ? (
                <Navigate to="/" />
              ) : (
                <SignInPage setIsAuthenticated={setIsAuthenticated} /> // Pass setter
              )
            }
          />
          <Route
            path="/signup"
            element={isAuthenticated ? <Navigate to="/" /> : <SignUpPage />}
          />
          <Route
            path="/*"
            element={
              isAuthenticated ? (
                <DefaultLayout setIsAuthenticated={setIsAuthenticated} />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
