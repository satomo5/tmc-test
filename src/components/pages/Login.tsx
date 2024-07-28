/** @jsxImportSource @emotion/react */
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Layout from "../templates/Layout";
import { Alert, Divider, Stack } from "@mui/material";
import { css } from "@emotion/react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { checkLogin, checkLoginOauth } from "../../libs/auth";
import { useGoogleLogin } from "@react-oauth/google";
import Iconify from "../atoms/Iconify";
import axios from "axios";

const DEFAULT_MESSAGE_ERROR = {
  email: "",
  password: "",
};

const DEFAULT_ALERT = {
  status: false,
  message: "",
};

/**
 * SignIn component for user authentication
 *
 * @returns JSX.Element
 */
export default function SignIn() {
  // State to manage whether the password is visible or not
  const [showPassword, setShowPassword] = useState(false);
  // State to manage the error messages for input fields
  const [error, setError] = useState(DEFAULT_MESSAGE_ERROR);
  // State to manage the alert messages for authentication
  const [alert, setAlert] = useState(DEFAULT_ALERT);
  // State to manage the loading state
  const [loading, setLoading] = useState(false);

  /**
   * Handles the form submission for user authentication
   *
   * @param {React.FormEvent<HTMLFormElement>} event - The form submit event
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // Check the login credentials
    const checkAuth = checkLogin(
      data.get("email") as string,
      data.get("password") as string
    );
    if (checkAuth.status) {
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 3000);
    } else {
      setLoading(false);
    }

    // Update the alert state with the authentication status and message
    setAlert({
      status: checkAuth.status,
      message: checkAuth.message || "",
    });

    // Update the error state with the error messages for input fields
    setError({
      email: checkAuth.message_email || "",
      password: checkAuth.message_password || "",
    });
  };

  // Use the Google OAuth hook to handle Google login
  const loginWithGoogle = useGoogleLogin({
    onSuccess: (responseGoogle) => {
      setLoading(true);
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${responseGoogle.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${responseGoogle.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          const data = res.data;
          // Check the OAuth credentials
          const checkAuth = checkLoginOauth(
            data?.email,
            data?.name,
            data?.picture
          );

          if (checkAuth.status) {
            setTimeout(() => {
              window.location.href = "/dashboard";
            }, 3000);
          } else {
            setLoading(false);
          }

          // Update the alert state with the authentication status and message
          setAlert({
            status: checkAuth.status,
            message: checkAuth.message || "",
          });
        })
        .catch((err) => console.log(err));
    },
  });

  return (
    <Layout>
      {/* Render the sign-in form */}
      {/* Rest of the code */}
      <Stack direction="row">
        <Box
          sx={{
            flex: 1,
            backgroundColor: "#F8FAFF",
            height: "100vh",
            display: { xs: "none", lg: "flex" },
          }}
          justifyContent="center"
          alignItems="center"
        >
          <img
            src="/images/login.png"
            alt="login"
            css={css`
              width: 100%;
              max-width: 700px;
              aspect-ratio: 1/1;
              object-fit: contain;
            `}
          />
        </Box>
        <Box
          width="100%"
          height="100vh"
          maxWidth={750}
          p={3}
          position="relative"
          overflow="hidden"
          sx={{
            margin: { xs: "0 auto", lg: "0" },
          }}
        >
          <img
            src="/images/login-assets.png"
            alt="assets1"
            css={css`
              z-index: 1;
              position: absolute;
              top: -20px;
              right: 0;
              width: 200px;
              object-fit: contain;
              aspect-ratio: 1/1;
            `}
          />
          <img
            src="/images/login-assets.png"
            alt="assets1"
            css={css`
              z-index: 1;
              position: absolute;
              bottom: -20px;
              left: -40px;
              width: 200px;
              object-fit: contain;
              aspect-ratio: 1/1;
              transform: rotate(180deg);
            `}
          />
          <Box
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              width="100%"
              maxWidth={480}
            >
              <Typography
                component="h1"
                variant="h4"
                width="100%"
                marginBottom={3}
              >
                Welcome Back
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                width="100%"
                sx={{ mt: 1 }}
              >
                {alert.message && (
                  <Alert
                    variant="filled"
                    severity={alert.status ? "success" : "warning"}
                    sx={{ mb: 2 }}
                  >
                    {alert.message}
                  </Alert>
                )}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  error={!!error.email}
                  helperText={error.email}
                />
                <Box position="relative">
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="current-password"
                    error={!!error.password}
                    helperText={error.password}
                  />
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    css={css`
                      opacity: 0.7;
                      position: absolute;
                      right: 10px;
                      top: 0;
                      cursor: pointer;
                      height: 56px;
                      margin-top: 16px;

                      display: flex;
                      align-items: center;
                      justify-content: center;
                    `}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </div>
                </Box>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={loading}
                >
                  Sign In
                </Button>
                <Box display="flex" alignItems="center" gap={1}>
                  <Divider sx={{ flex: 1 }} />
                  <Typography sx={{ opacity: 0.5 }} fontSize="12px">
                    OR
                  </Typography>
                  <Divider sx={{ flex: 1 }} />
                </Box>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{
                    mt: 3,
                    mb: 2,
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                  }}
                  onClick={() => loginWithGoogle()}
                  disabled={loading}
                >
                  <Iconify icon="logos:google-icon" fontSize={20} />
                  Sign in With Google
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Stack>
    </Layout>
  );
}
