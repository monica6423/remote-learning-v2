import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.tsx';
import Container from '@mui/material/Container';

const Layout: React.FC = () => {
  return (
    <>
      <Navbar />
      <Container style={{ marginTop: '80px' }}>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
