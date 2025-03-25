import React, { lazy, Suspense, useState } from "react";
import {
  Box,
  Typography,
  Link,
  FormControl,
  InputAdornment,
  IconButton,
  TextField,
  Button,
  Paper,
  Stack,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./signin.css";
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Person as PersonIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";

const SignUp = React.lazy(() => import("../sign-up/signup"));

const generateCaptcha = () => {
  const chars = "ABCDEFGHJKLMNPOQRSTUVWXYZ0123456789";
  let captcha = "";
  for (let i = 0; i < 5; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
};

const OutlinedInputCustom = styled(TextField)({
  "& .MuiInputLabel-root": { color: "#6F7E8C", fontSize: "14px" },
  "& label.Mui-focused": { color: "#6F7E8C" },
  "& .MuiInput-underline:after": { borderBottomColor: "#B2BAC2" },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "hsla(0, 0.00%, 18.00%, 0.49)",
      background: "rgba(0, 0, 0, .2)",
    },
    "&:hover fieldset": {
      borderColor: "#6F7E8C",
      background: "rgba(0, 0, 0, .2)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6F7E8C",
      background: "rgba(0, 0, 0, .2)",
    },
    "& input": { color: "hsla(0, 0%, 100%, .9)" },
  },
});

const LoginPage = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [captchaText, setCaptchaText] = useState(generateCaptcha());
  const [userCaptcha, setUserCaptcha] = useState("");
  const [captchaError, setCaptchaError] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);

  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    if (userCaptcha.toUpperCase() !== captchaText) {
      setCaptchaError(true);
      console.log("CAPTCHA validation failed");
      return;
    }

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");
    console.log("Credentials:", { username, password });
    console.log("API URL:", import.meta.env.VITE_SERVER_API_URL);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_API_URL}/api/auth/login`,
        { username, password },
        { withCredentials: true }
      );
      console.log("Login response:", response.data);
      if (response.data.success) {
        setIsAuthenticated(true); // Update authentication state
        setSuccessOpen(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError(
        error.response?.data?.message ||
          "Invalid credentials. Please try again."
      );
    }
  };

  const refreshCaptcha = () => {
    setCaptchaText(generateCaptcha());
    setUserCaptcha("");
    setCaptchaError(false);
  };

  const handleSuccessClose = () => {
    setSuccessOpen(false);
    navigate("/"); // Navigate after confirmation
  };

  return (
    <Box className="login-container">
      <form
        onSubmit={handleSubmit}
        style={{ transform: "translateX(-160px)", width: "360px" }}
      >
        <Paper elevation={0} sx={{ backgroundColor: "transparent" }}>
          <Stack
            spacing={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{ color: "hsl(0, 0.00%, 100.00%)" }}
            >
              Login to AYKA-EMS
            </Typography>
            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <OutlinedInputCustom
                id="username"
                name="username"
                label="Email or Phone"
                fullWidth
                type="text"
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        sx={{ color: "hsla(0, 0%, 100%, .6)" }}
                      >
                        <PersonIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <OutlinedInputCustom
                id="password"
                name="password"
                label="Password"
                fullWidth
                size="small"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword
                            ? "hide the password"
                            : "display the password"
                        }
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        sx={{ color: "hsla(0, 0%, 100%, .6)" }}
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <Box sx={{ mt: 2, mb: 1, width: "100%" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box sx={{ flex: "0 0 60%" }}>
                  <OutlinedInputCustom
                    fullWidth
                    variant="outlined"
                    size="small"
                    label="Enter CAPTCHA"
                    autoComplete="off"
                    value={userCaptcha}
                    onChange={(e) => {
                      setUserCaptcha(e.target.value);
                      setCaptchaError(false);
                    }}
                    error={captchaError}
                    helperText={captchaError && "Incorrect CAPTCHA code"}
                    sx={{
                      "& .MuiInputBase-input": {
                        color: "#fff",
                        textTransform: "uppercase",
                      },
                      "& .MuiFormLabel-root": { color: "#6F7E8C" },
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    flex: "0 0 36%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                    background: "rgba(0,0,0,0.3)",
                    borderRadius: "4px",
                    padding: 0.4,
                    position: "relative",
                  }}
                >
                  <Box sx={{ position: "relative", display: "inline-block" }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "monospace",
                        fontSize: "1.5rem",
                        letterSpacing: "0px",
                        color: "#fff",
                        userSelect: "none",
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      {captchaText.split("").map((char, index) => (
                        <span
                          key={index}
                          style={{
                            display: "inline-block",
                            transform: `rotate(${Math.random() * 20 - 10}deg)`,
                            margin: "0 2px",
                          }}
                        >
                          {char}
                        </span>
                      ))}
                    </Typography>
                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: 0,
                        right: 0,
                        height: "2px",
                        backgroundColor: "#ffffff",
                        transform: "translateY(-50%)",
                        zIndex: 0,
                      }}
                    />
                  </Box>
                  <IconButton
                    onClick={refreshCaptcha}
                    sx={{
                      position: "absolute",
                      color: "#fff",
                      right: 0,
                      padding: 1,
                    }}
                    aria-label="Refresh CAPTCHA"
                  >
                    <RefreshIcon />
                  </IconButton>
                </Box>
              </Box>
            </Box>
            {loginError && (
              <Typography
                variant="caption"
                color="error"
                sx={{ alignSelf: "flex-start" }}
              >
                {loginError}
              </Typography>
            )}
            <Typography
              variant="caption"
              gutterBottom
              sx={{ color: "#9e9e9e", alignSelf: "flex-start" }}
            >
              Forgot your password?{" "}
              <Link href="#" underline="none" sx={{ color: "primary.light" }}>
                {"Reset it"}
              </Link>
            </Typography>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#e74f30",
                "&:hover": { backgroundColor: "#d84315" },
              }}
            >
              LOG IN
            </Button>
            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{ color: "hsl(0, 0.00%, 100.00%)" }}
            >
              OR
            </Typography>
            <Button
              type="button"
              variant="contained"
              fullWidth
              onClick={() => navigate("/signup")}
              sx={{
                backgroundColor: "#1976d2",
                "&:hover": { backgroundColor: "#1565c0" },
              }}
            >
              CREATE ACCOUNT
            </Button>
          </Stack>
        </Paper>
      </form>

      {/* Success Dialog */}
      <Dialog open={successOpen} onClose={handleSuccessClose}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <Typography>Login successful! Welcome back.</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSuccessClose}
            color="primary"
            variant="contained"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LoginPage;
