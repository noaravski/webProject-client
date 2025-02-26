import { MDBNavbar, MDBNavbarBrand, MDBContainer } from "mdb-react-ui-kit";
import logo from "../../assets/popcorn.png";

const Navbar = () => {
  return (
    <div className="home mb-10">
      <MDBNavbar dark bgColor="dark" fixed="top">
        <MDBContainer fluid>
          <MDBNavbarBrand className="text-white">
            <img
              src={logo}
              alt="logo"
              width="30"
              height="30"
              className="d-inline-block align-text-top me-2"
            ></img>
            MovieRator
          </MDBNavbarBrand>
          <MDBNavbarBrand href="/" className="text-white">
            Home    
        </MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>
    </div>
  );
};

export default Navbar;
