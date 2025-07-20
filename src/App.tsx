import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ConfirmOtpPage from "./pages/ConfirmOtpPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/AuthContext";
import UserInformationPage from "./pages/UserInformationPage";
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />}></Route>
            <Route path="/confirm-otp" element={<ConfirmOtpPage />}></Route>
            <Route
              path="/user-information"
              element={<UserInformationPage />}
            ></Route>
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
