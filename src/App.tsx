import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import VerifyOtpPage from "./pages/VerifyOtpPage";

import { useAuth } from "./contexts/AuthContext";
import UserInformationPage from "./pages/UserInformationPage";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { useRefreshToken } from "./mutations/authMutations";
const App = () => {
  // localStorage.clear();
  const auth = useAuth();

  const { mutate } = useRefreshToken();

  if (auth.token && dayjs.unix(jwtDecode(auth.token!).exp!).isBefore(dayjs())) {
    mutate(
      {
        refreshToken: auth.refreshToken!,
      },
      {
        onSuccess: (data) => {
          auth.setToken(data.data.newToken);
        },
      }
    );
  }
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          // element={<UserInformationPage />}
          element={<LoginPage />}
        ></Route>
        <Route path="/verify-otp" element={<VerifyOtpPage />}></Route>
        <Route
          path="/user-information"
          element={<UserInformationPage />}
        ></Route>
      </Routes>
    </Router>
  );
};

export default App;
