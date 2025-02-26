import React from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
  MDBIcon,
  MDBTextArea,
} from "mdb-react-ui-kit";
import Navbar from "../Navbar/Navbar";

export default function ProfileStatistics() {
  return (
    <div>
      <Navbar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "60px",
          gap: "2rem",
        }}
      ></div>
      <MDBContainer className="container py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCard style={{ borderRadius: "15px" }}>
            <MDBCardBody className="text-center" style={{ width: "500px", height: "500px" }}>
              <div className="mt-3 mb-4">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                  className="rounded-circle"
                  fluid
                  style={{ width: "200px" }}
                />
              </div>
              <MDBTextArea
                // {...register("description", { required: true })}
                className="form-control"
                wrapperClass="mb-4"
                label="Description"
                id="formControlLg"
                size="lg"
                maxLength={720}
                placeholder="Enter your Description here..."
                //  defaultValue={user?.description}
              />
              <MDBBtn outline rounded size="lg" className="mt-4" type="submit">
                Upload Movie Suggestion
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
