import {
  AppBar,
  Box,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import type { NavLinkType } from "../type/NavLinkType";

const Appbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks: NavLinkType[] = [
    { label: "Home", path: "/" },
    { label: "Orders", path: "/orders" },
    { label: "Menu", path: "/menu" },
  ];

  const currentTab = navLinks.findIndex(
    (link) => link.path === location.pathname
  );

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    navigate(navLinks[newValue].path);
  };

  return (
    <>
      <AppBar position="static" elevation={0} sx={{ backgroundColor: "#fff" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* title */}
          <Typography
            variant="h6"
            color="primary"
            onClick={() => navigate("/")}
          >
            My Foods
          </Typography>

          {/* tabs */}
          <Tabs value={currentTab} onChange={handleChangeTab}>
            {navLinks.map((link) => (
              <Tab label={link.label} key={link.path} />
            ))}
          </Tabs>

          {/* user info */}
          <Typography sx={{ color: "#000" }}>
            Logged in as <strong>John Doe</strong>
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Appbar;
