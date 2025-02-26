import React, { useCallback, useState, useEffect } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
} from "mdb-react-ui-kit";
import "./Profile.css";
import { useLocation } from "react-router-dom";
import { getUserById } from "../../services/userService";

import EditProfileModal from "../EditProfile/EditProfile";

const Profile: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("id");

  const [user, setUser] = useState<any>(null);

  const fetchUser = async () => {
    const userData = await getUserById(userId || "");
    setUser(userData);
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);
  
  const handleProfileUpdated = () => {
    fetchUser();
  };

  const [isEditOpen, setIsEditOpen] = useState(false);
  const handleOpenEdit = () => {
    setIsEditOpen(true);
  };
  const handleCloseEdit = () => setIsEditOpen(false);

  return (
    <div
      style={{
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        position: "absolute",
        width: "100%",
      }}
    >
      <MDBContainer
        style={{
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
          position: "absolute",
          width: "100%",
        }}
      >
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem>
                <a href="#">Home</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <a href="#">User</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol lg="5">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: "300px" }}
                  fluid
                />
                <div className="d-flex justify-content-center mb-2 mt-2">
                  <MDBBtn outline className="ms-1" onClick={handleOpenEdit}>
                    Edit Profile
                  </MDBBtn>
                  <EditProfileModal
                    open={isEditOpen}
                    handleClose={handleCloseEdit}
                    user={user}
                    onProfileUpdated={handleProfileUpdated}
                  />
                </div>
                <div className="mt-3 ">
                  <MDBCardText className="mb-1 h5">253</MDBCardText>
                  <MDBCardText className="small text-muted mb-0">
                    Photos
                  </MDBCardText>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol lg="7">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {user?.username}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {user?.email}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol>
                    <MDBCardText>Description</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol style={{ height: "215px" }}>
                    <MDBCardText>{user?.description}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Profile;
