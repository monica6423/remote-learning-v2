import React, { useState, useEffect, MouseEvent, KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { logout } from '../redux/authSlice';

// import { RootState } from '../../store';
// import { logout as logoutAction } from '../../actions/auth';

// interface NavbarProps extends PropsFromRedux {}

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [smallNavbar, setSmallNavbar] = useState(false);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const loading = useSelector((state: RootState) => state.auth.loading);


  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const toggleDrawer = (open: boolean) => (event: MouseEvent | KeyboardEvent) => {
    if (event.type === 'keydown' && (event as KeyboardEvent).key === 'Tab' || (event as KeyboardEvent).key === 'Shift') {
      return;
    }
    setMobileOpen(open);
  };

  const handleScroll = () => {
    if (window.scrollY > 250) {
      setSmallNavbar(true);
    } else {
      setSmallNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  const authLinks = (
    <>
      <Button color="inherit" component={Link} to="/profiles">Buddies</Button>
      <Button color="inherit" component={Link} to="/learnings">Books</Button>
      <Button color="inherit" component={Link} to="/posts">Groups</Button>
      <Button color="inherit" component={Link} to="/dashboard">Home</Button>
      <Button color="inherit" onClick={handleLogout}>Logout</Button>
    </>
  );

  const guestLinks = (
    <>
      <Button color="inherit" component={Link} to="/profiles">Buddies</Button>
      <Button color="inherit" component={Link} to="/learnings">Books</Button>
      <Button color="inherit" component={Link} to="/login">Groups</Button>
      <Button color="inherit" component={Link} to="/register">Signup</Button>
      <Button color="inherit" component={Link} to="/login">Login</Button>
    </>
  );

  const drawerLinks = (
    <List>
      {isAuthenticated ? authLinks : guestLinks}
    </List>
  );

  return (
    <>
      <AppBar position="fixed" className={smallNavbar ? 'small-navbar' : 'transition-all duration-300'}>
        <Toolbar className="flex justify-between">
          <Link to="/">
            logo
          </Link>
          <Box sx={{ display: { xs: 'none', sm: 'block' }, flexGrow: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
              {drawerLinks}
            </Box>
          </Box>
          <Box sx={{ display: { xs: 'flex', sm: 'none' }, justifyContent: 'end', flexGrow: 1 }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer(false)} 
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        <div
          className="w-64"
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          {drawerLinks}
        </div>
      </Drawer>
    </>
  );
};

// const mapStateToProps = (state: any) => ({
//   auth: state.auth,
// });

// const connector = connect(mapStateToProps);
// type PropsFromRedux = ConnectedProps<typeof connector>;

export default Navbar;
