import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Logout from "../../auth/Logout";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
// import Login from "../../Login";

const MainNavbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  return (
    <>
      <Navbar className="navbar navbar-expand navbar-dark bg-dark">
        <Navbar.Brand as={NavLink} to="/todos" className="ms-2">
          Todo List
        </Navbar.Brand>
        {isAuthenticated ? (
          <Nav className="container d-flex justify-content-end ">
            <Navbar.Text>Welcome {user?.name}</Navbar.Text>
            <Nav.Link>
              <Logout />
            </Nav.Link>
          </Nav>
        ) : (
          <Nav className="container  justify-content-end">
            <Nav.Link as={NavLink} to="/" className="p-0 mb-0">
              Sign In
            </Nav.Link>
          </Nav>
        )}
      </Navbar>
    </>
  );
};

export default MainNavbar;
