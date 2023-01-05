import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  Tooltip,
} from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import ModeToggle from "../components/common/ModeToggle";
import { DarkmodeContext } from "../contex/darkmode/index";

const pages = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/about",
  },

  {
    name: "Profile",
    path: "/profile",
  },
  {
    name: <LocalMallIcon />,
    path: "/cart",
  },
  {
    name: "LogIn",
    path: "/auth",
  },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function HocNavigation({ children }) {
  const navigate = useNavigate();
  const [state, dispatch] = React.useContext(DarkmodeContext);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavigate = (path) => {
    navigate(`${path}`);
  };

  return (
    <div
      style={{
        color: state.shades.secondary,
        backgroundColor: state.shades.primary,
        maxWidth: "100%",
        minHeight: "100vh",
      }}
    >
      <AppBar
        position="sticky"
        color="secondary"
        sx={{
          color: state.shades.secondary,
          backgroundColor: state.shades.primary,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              sx={{
                width: "auto",
                display: { xs: "none", md: "flex" },
                // paddingTop: "20px",
              }}
            >
              <Typography
                sx={{
                  color: state.shades.secondary,
                  fontWeight: "bold",
                  fontSize: "clamp(12px, 2.8rem, 4rem )",
                  textShadow: "3px 0px 2px black",
                }}
              >
                o<span style={{ color: "red" }}>N</span>store
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                sx={{
                  color: state.shades.secondary,
                }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
                PaperProps={{
                  style: {
                    backgroundColor: state.shades.primary,
                    color: state.shades.secondary,
                  },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.name}
                    onClick={() => handleNavigate(page.path)}
                  >
                    <Typography
                      sx={{
                        color: state.shades.secondary,
                      }}
                      textAlign="center"
                    >
                      {page.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>

              <Box
                sx={{
                  width: "auto",
                  paddingTop: "2px",
                }}
              >
                <Typography
                  sx={{
                    color: "",
                    fontWeight: "bold",
                    fontSize: "clamp(12px, 1.8rem, 4rem )",
                    textShadow: "3px 0px 2px black",
                  }}
                >
                  o<span style={{ color: "red" }}>N</span>store
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={() => handleNavigate(page.path)}
                  sx={{
                    my: 2,

                    display: "block",
                    padding: "0 2rem",
                    // color: state.shades.secondary,
                  }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip color="primary" bold="true" size="small" title="mode">
                <Button>
                  <ModeToggle />
                </Button>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {children}
    </div>
  );
}

export default HocNavigation;
