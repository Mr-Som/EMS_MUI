import React, { Suspense } from "react";
import { Box } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout.jsx"));
const SignInPage = React.lazy(
  () => import("./views/authentication/sign-in/signin.jsx")
);
const SignUpPage = React.lazy(
  () => import("./views/authentication/sign-up/signup.jsx")
);

const App = () => {
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
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/*" element={<DefaultLayout />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
