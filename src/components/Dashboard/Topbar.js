import React from 'react';
import { Navbar } from 'react-bootstrap';
import logo from '../assets/logo.png';

const TopBar = () => {
  return (
    <Navbar bg="blue" variant="dark" expand="lg" style={{ height: '70px' }}>
      <Navbar.Brand href="/" style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={logo}
          alt="Logo"
          height="35" 
          className="d-inline-block align-top"
        />
        <span style={{ marginLeft: '10px', font: 'inherit' }}>Pokedex</span>
      </Navbar.Brand>
    </Navbar>
  );
};

export default TopBar;
