import React from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarBrand,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/popcorn.png";
import "./Navbar.css";
import { logout } from "../../services/userService";


const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    console.log("User logged out");
    navigate("/login");
  };

  return (
    <>
      <MDBNavbar expand="lg" dark bgColor="dark" fixed="top">
        <MDBContainer fluid>
          <MDBNavbarBrand>
            <img src={logo} width="30" height="30" alt="logo" />
            MovieRator
          </MDBNavbarBrand>
          <MDBNavbarNav className="align-items-center me-auto mb-2 mb-lg-0">
            <MDBNavbarItem>
              <MDBNavbarLink
                aria-current="page"
                href="/"
                className={currentPath === "/" ? "active-link" : ""}
              >
                Home
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink
                href="/Profile"
                className={currentPath === "/Profile" ? "active-link" : ""}
              >
                Profile
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarNav className="align-items-center ms-auto mb-2 mb-lg-0">
              <MDBNavbarItem>
                <MDBNavbarLink
                  href="/add"
                  className={currentPath === "/add" ? "active-link" : ""}
                >
                  Upload Post
                </MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
            <MDBNavbarNav className="align-items-center ms-auto mb-2 mb-lg-0  justify-content-end">
              <MDBNavbarItem>
                <MDBBtn color="danger" onClick={handleLogout}>
                  Logout
                </MDBBtn>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBNavbarNav>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
};

export default Navbar;
