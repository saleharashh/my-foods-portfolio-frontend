import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import VerifyOtpPage from "./pages/VerifyOtpPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import UserInformationPage from "./pages/UserInformationPage";
import { createTheme, ThemeProvider } from "@mui/material";
import { queryClient } from "./ReactQueryClient.ts";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#D62828", // Leaf Green
    },
    secondary: {
      main: "#F77F00", // Mint Green
    },
    background: {
      default: "#FFF4E6", // Off-white
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1C1C1C", // Dark Gray
    },
  },
  typography: {
    h1: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.5,
      color: "#ffffff",
    },
  },
});
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={lightTheme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
