import "./SignUp.css";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import movie from "./assets/movie.png";
import logo from "./assets/logo.png";
import google from "./assets/google.png";

function App() {
  return (
    <MDBContainer className="my-5">
      <MDBCard style={{ maxWidth: "500vw" }}>
        <MDBRow className="g-0">
          <MDBCol md="6">
            <MDBCardImage
              src={movie}
              alt="login form"
              className="rounded-start w-100"
            />
          </MDBCol>

          <MDBCol md="6">
            <MDBCardBody className="d-flex flex-column">
              <div className="d-flex flex-row align-items-center">
                <img src={logo} alt="logo" className="logo" />
                <span className="h1 fw-bold">MovieRator</span>
              </div>

              <MDBBtn
                className="mb-4"
                color="dark"
                size="sm"
                style={{ padding: "0px" }}
              >
                <div className="align-items-center">
                  <img src={google} alt="logo" className="icon" />
                  Log In with Google
                </div>
              </MDBBtn>

              <div className="divider d-flex align-items-center mb-4">
                <p className="text-center fw-bold mx-3 mt-0 mb-0">OR</p>
              </div>

              <MDBInput
                wrapperClass="mb-4"
                label="Email address"
                id="formControlLg"
                type="email"
                size="lg"
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="formControlLg"
                type="password"
                size="lg"
              />

              <MDBBtn
                className="mb-4 px-5"
                color="dark"
                size="lg"
                style={{ marginTop: "20px" }}
              >
                Login
              </MDBBtn>
              <p className="mb-3 pb-lg-2" style={{ color: "#393f81" }}>
                Don't have an account?{" "}
                <a href="#!" style={{ color: "#393f81" }}>
                  Register here
                </a>
              </p>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default App;
