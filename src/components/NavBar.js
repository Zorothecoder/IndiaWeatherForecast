import React from 'react'
import {Nav,Navbar,Container} from 'react-bootstrap';

function NavBar() {
  const title ={
    fontSize: '24px',
    color: '#fed402',
    fontWeight: '600'
  }
  return (
    <Navbar expand="lg" className="bg-body-transparent">
      <Container>
        <Navbar.Brand href="#" style={title}>ICWF: Indian City Weather Forecast</Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="text-white" href="/"></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;