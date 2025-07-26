import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import VerifyOtpPage from "./pages/VerifyOtpPage";
import Appbar from "./components/Appbar";
import UserInformationPage from "./pages/UserInformationPage";
import HomePage from "./pages/HomePage";
import OrdersPage from "./pages/OrdersPage";
import MenuPage from "./pages/MenuPage";
import AppbarWrapper from "./components/AppbarWrapper";
const App = () => {
  return (
    <Router>
      <Routes>
        {/* routes with appbar */}
        <Route element={<AppbarWrapper />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/menu" element={<MenuPage />} />
        </Route>

        {/* pages without appbar */}

        <Route path="/login" element={<LoginPage />} />
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
