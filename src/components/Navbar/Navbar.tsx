import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarBrand,
} from "mdb-react-ui-kit";
import logo from "../../assets/popcorn.png";

const Navbar = () => {
  return (
    <>
      <MDBNavbar expand="lg" dark bgColor="dark" fixed="top">
        <MDBContainer fluid>
          <MDBNavbarBrand>
            <img src={logo} width="30" height="30"></img>
            MovieRator
          </MDBNavbarBrand>

          <MDBNavbarNav className="align-items-center me-auto mb-2 mb-lg-0 ">
            <MDBNavbarItem className="active">
              <MDBNavbarLink aria-current="page" href="/">
                Home
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="/Profile">Profile</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem className="ms-auto">
              <MDBNavbarLink href="/add">
                <button className="btn btn-outline-light">+</button>
              </MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
};

export default Navbar;
