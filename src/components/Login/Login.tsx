import "../Login/Login.css";
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
import movie from "../../assets/movie.png";
import logo from "../../assets/logo.png";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { login, googleLogin } from "../../services/userService";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type LoginData = {
  email: string;
  password: string;
};

function Login() {
  const { register, handleSubmit } = useForm<LoginData>({});
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const googleResponseMessage = async (
    credentialResponse: CredentialResponse
  ) => {
    try {
      await googleLogin(credentialResponse.credential);
      navigate("/");
    } catch (error) {
      console.error("Google login error", error);
      setErrorMessage("Google login failed. Please try again.");
    }
  };

  const googleErrorMessage = () => {
    console.error("Google error");
    setErrorMessage("Google login failed. Please try again.");
  };

  const onSubmit = async (data: LoginData) => {
    const { email, password } = data;
    try {
      const user = await login(email, password);
      if (user) {
        navigate(`/`);
      } else {
        setErrorMessage(`Login failed. Please check your email and password.`);
      }
    } catch (error) {
      console.error("Login error", error);
      setErrorMessage("Login failed. Please check your email and password.");
    }
  };

  return (
    <MDBContainer className="my-5">
      <MDBCard style={{ maxWidth: "500vw" }}>
        <MDBRow className="g-0">
          <MDBCol md="6">
            <MDBCardImage
              src={movie}
              alt="login form"
              className="rounded-start w-100 h-100"
              style={{ objectFit: "cover" }}
            />
          </MDBCol>

          <MDBCol md="6">
            <MDBCardBody className="d-flex flex-column">
              <div className="d-flex flex-row align-items-center">
                <img src={logo} alt="logo" className="logo" />
                <span className="h1 fw-bold">MovieRator</span>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <GoogleLogin
                  width={300}
                  onSuccess={googleResponseMessage}
                  onError={googleErrorMessage}
                  click_listener={() => googleResponseMessage}
                ></GoogleLogin>
              </div>
              <div className="divider d-flex align-items-center mb-4 mt-2">
                <p className="text-center fw-bold mx-3 mt-0 mb-0">OR</p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
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
                {errorMessage && (
                  <div className="text-danger mb-3">{errorMessage}</div>
                )}
                <MDBBtn
                  type="submit"
                  className="mb-4 px-5"
                  color="dark"
                  size="lg"
                  style={{ marginTop: "20px" }}
                >
                  Login
                </MDBBtn>
              </form>
              <p className="mb-3 pb-lg-2" style={{ color: "#393f81" }}>
                Don't have an account?{" "}
                <a
                  href="#!"
                  style={{ color: "#393f81" }}
                  onClick={() => navigate("/signup")}
                >
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

export default Login;
