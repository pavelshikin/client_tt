import React from 'react';
import NavBar from '../Navbar';

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className="main">{children}</div>
    </>
  );
};

export default Layout;
