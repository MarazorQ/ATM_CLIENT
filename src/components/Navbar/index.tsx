import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import {RouteNames} from '../../router'
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const pages = [
    {path: RouteNames.REGISTER_CLIENT, name: "Add new client"}, 
    {path: RouteNames.CLIENT_LIST, name: "Client list"}, 
];

const ResponsiveAppBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = (event: any) => {
    const path: string = event.currentTarget.dataset.myValue
    navigate(path)
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" style={{marginBottom: "20px"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 20, display: { xs: "none", md: "flex" } }}
          >
            ATM
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" }
              }}
            >
              {pages.map((page) => (
                location.pathname !== page.path
                    ?
                        <MenuItem
                        key={page.path}
                        onClick={handleCloseNavMenu}
                        data-my-value={page.path}
                        >
                        <Typography textAlign="center">{page.name}</Typography>
                        </MenuItem>
                    :
                        null
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            ATM
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.path}
                onClick={handleCloseNavMenu}
                data-my-value={page.path}
                sx={{ my: 2, color: "white", display: "block" }}
                style={location.pathname === page.path 
                    ? 
                    {borderBottom: "2px solid white"}
                    :
                    {}
                }
              >
                {page.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
