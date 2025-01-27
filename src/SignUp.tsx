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
import { register as registerUser } from "./services/userService";
import { useForm } from "react-hook-form";

type RegisterData = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

function SignUp() {
  const onSubmit = async (data: RegisterData) => {
    const { email, firstName, lastName, password } = data;
    console.log("data", data);
    const username = `${firstName} ${lastName}`;
    await registerUser(email, username, password);
  };

  const { register, handleSubmit } = useForm<RegisterData>({});

  return (
    <MDBContainer className="my-5">
      <MDBCard>
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
                  Sign Up with Google
                </div>
              </MDBBtn>

              <div className="divider d-flex align-items-center mb-4">
                <p className="text-center fw-bold mx-3 mt-0 mb-0">OR</p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <MDBRow>
                  <MDBCol col="6">
                    <MDBInput
                      {...register("firstName", { required: true })}
                      wrapperClass="mb-4"
                      label="First name"
                      id="formControlLg"
                      type="text"
                      size="lg"
                    />
                  </MDBCol>

                  <MDBCol col="6">
                    <MDBInput
                      {...register("lastName", { required: true })}
                      wrapperClass="mb-4"
                      label="Last name"
                      id="formControlLg"
                      type="text"
                      size="lg"
                    />
                  </MDBCol>
                </MDBRow>

                <MDBInput
                  {...register("email", { required: true })}
                  wrapperClass="mb-4"
                  label="Email address"
                  id="formControlLg"
                  type="email"
                  size="lg"
                />
                <MDBInput
                  {...register("password", { required: true })}
                  wrapperClass="mb-4"
                  label="Password"
                  id="formControlLg"
                  type="password"
                  size="lg"
                />

                <MDBBtn
                  className="mb-4 px-5 mt-6"
                  color="dark"
                  size="lg"
                  style={{ marginTop: "10px" }}
                >
                  Sign Up
                </MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default SignUp;