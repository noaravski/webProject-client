import { useState } from "react";
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
import movie from "../../assets/movie.png";
import logo from "../../assets/logo.png";
import {
  register as registerUser,
  googleLogin,
} from "../../services/userService";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ProfilePic from "../ProfilePic/Profilepic";

type RegisterData = {
  email: string;
  username: string;
  password: string;
  profilePic?: File;
};

function SignUp() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [profilePic, setProfilePic] = useState<File | undefined>();
  const { register, handleSubmit } = useForm<RegisterData>();

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

  const onSubmit = async (data: RegisterData) => {
    try {
      
      if (profilePic && profilePic.size > 5 * 1024 * 1024) {
        setErrorMessage("Profile picture is too large. Maximum size is 5MB.");
        return;
      }

      const { email, username, password } = data;
      const res = await registerUser(
        email,
        username,
        password,
        profilePic as File
      );

      if (res) {
        navigate("/");
      } else {
        setErrorMessage(
          "Registration failed. Please check your details and ensure your username is unique."
        );
      }
    } catch (error) {
      console.error("Register error", error);
      setErrorMessage(
        "Registration failed. Please check your details and ensure your username is unique."
      );
    }
  };

  return (
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className="g-0">
          <MDBCol md="6" className="d-none d-md-flex">
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
                ></GoogleLogin>
              </div>

              <div className="divider d-flex align-items-center mb-4 mt-2">
                <p className="text-center fw-bold mx-3 mt-0 mb-0">OR</p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ProfilePic onFileSelect={(file) => setProfilePic(file)} />
                <MDBRow>
                  <MDBCol col="6">
                    <MDBInput
                      {...register("username", { required: true })}
                      wrapperClass="mb-4"
                      label="User name"
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
                {errorMessage && (
                  <div className="text-danger mb-3">{errorMessage}</div>
                )}
                <MDBBtn
                  className="mb-4 px-5 mt-6"
                  color="dark"
                  size="lg"
                  style={{ marginTop: "10px" }}
                  type="submit"
                >
                  Sign Up
                </MDBBtn>
              </form>
              <p className="mb-3 pb-lg-2" style={{ color: "#393f81" }}>
                Already have an account?{" "}
                <a
                  href="#!"
                  style={{ color: "#393f81" }}
                  onClick={() => navigate("/login")}
                >
                  Login here
                </a>
              </p>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default SignUp;
