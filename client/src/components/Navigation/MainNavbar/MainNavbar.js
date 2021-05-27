import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Logout from "../../auth/Logout";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
// import Login from "../../Login";
import "./MainNavbar.css";

const MainNavbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  return (
    <>
      <Navbar bg="dark" className="justify-content-between px-4">
        <Navbar.Brand as={NavLink} to="/todos" className="text-light">
          Todo List
        </Navbar.Brand>
        {isAuthenticated ? (
          <Nav>
            <Navbar.Text
              className=" d-inline-block text-light text-nowrap text-truncate"
              style={{ maxWidth: "160px" }}
            >
              <span className="greeting">Welcome {user?.name}</span>
            </Navbar.Text>
            <Nav.Link className="text-light ">
              <Logout />
            </Nav.Link>
          </Nav>
        ) : (
          <Nav>
            <Nav.Link as={NavLink} to="/" className="text-light ">
              Sign In
            </Nav.Link>
          </Nav>
        )}
      </Navbar>
    </>
  );
};

export default MainNavbar;
