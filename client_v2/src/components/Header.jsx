import * as React from 'react';
import {AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, MenuItem} from '@mui/material';
import {Menu as MenuIcon} from '@mui/icons-material';
import Logo from './Logo';
import UserData from './UserData';
import {NavLink, useNavigate} from 'react-router-dom';

import {useLogin} from '../hooks/index';

const pagesGuest = [
  {
    label: 'Log In',
    path: '/login'
  },
  {
    label: 'Register',
    path: '/register'
  }
];

const pagesRegistered = [
  {
    label: 'Topics',
    path: '/topics'
  },
  {
    label: 'New Topic',
    path: '/new-topic'
  }
];

const pagesAdmin = [
  {
    label: 'Admin Panel',
    path: '/admin-panel'
  }
];

function Header() {
  const {isLoggedIn, userData, role} = useLogin();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [applicableRoutes, setApplicableRoutes] = React.useState([]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  React.useEffect(() => {
    const routes = [];

    if (isLoggedIn) {
      routes.push(...pagesRegistered);
    } else {
      routes.push(...pagesGuest);
    }

    if (role === 'Administrator') {
      routes.push(...pagesAdmin);
    }

    setApplicableRoutes(routes);
  }, [isLoggedIn, role]);

  return (
    <AppBar position="static" color="primary" enableColorOnDark>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo isMobile={false} />

          <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
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
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: {xs: 'block', md: 'none'}
              }}
            >
              {applicableRoutes.map((page) => (
                <MenuItem key={page.path} onClick={handleCloseNavMenu}>
                  <Typography component={NavLink} to={page.path} textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Logo isMobile={true} />
          <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
            {applicableRoutes.map((page) => (
                <NavLink className={'nav-link'} key={page.path} to={page.path}>
                  {page.label}
                </NavLink>
            ))}
          </Box>
          {isLoggedIn && userData && (
            <UserData />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
