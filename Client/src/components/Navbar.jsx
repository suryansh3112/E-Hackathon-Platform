import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useAuth } from '../contexts/AuthContext';
const loggedOutPages = [
  { name: 'Login', route: '/login' },
  { name: 'Register', route: '/register' },
];
const loggedInPages = [
  { name: 'Profile', route: '/profile' },
  { name: 'Teams', route: '/teams' },
  { name: 'Chat', route: '/chat' },
  { name: 'Hackathons', route: '/hackathons' },
  { name: 'My Hackathons', route: '/my-hackathons' },
];
const organiseHackathon = [
  {
    name: 'Organise Hackathon',
    route: '/organise-hackathon',
  },
  {
    name: 'My Organised Hackathons',
    route: '/my-organized-hackathons',
  },
];

const Navbar = () => {
  const {
    userData: { isLoggedIn },
    logout,
  } = useAuth();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [pages, setPages] = React.useState([]);

  React.useEffect(() => {
    setPages(isLoggedIn ? loggedInPages : loggedOutPages);
  }, [isLoggedIn]);

  const getRightMenuBar = () => {
    if (isLoggedIn) return [...pages, ...organiseHackathon];
    else return pages;
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (route) => {
    setAnchorElNav(null);
  };
  const logoutUser = () => {
    logout();
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ flexGrow: { xs: 1, md: 0 }, mr: 3 }}
          >
            E-Hack
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => handleCloseNavMenu(page.route)}
                sx={{ my: 2, color: 'white', display: 'block' }}
                component={Link}
                to={page.route}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {getRightMenuBar().map((page) => {
                if (!page) return null;
                return (
                  <MenuItem
                    key={page.name}
                    onClick={() => handleCloseNavMenu(page.route)}
                    component={Link}
                    to={page.route}
                  >
                    <Typography textAlign='center'>{page.name}</Typography>
                  </MenuItem>
                );
              })}
              {isLoggedIn && (
                <MenuItem onClick={logoutUser}>
                  <Typography textAlign='center'>Logout</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
