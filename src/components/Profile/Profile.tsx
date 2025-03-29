import "../Profile/Profile.css";
import React, { useState, useEffect } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import "./Profile.css";
import { getUserDetails } from "../../services/userService";
import { IUser } from "../../interfaces/user";
import { getPostsByUser, IPostWithComments } from "../../services/postService";
import { getCommentsByPost } from "../../services/commentService";

import EditProfileModal from "../EditProfile/EditProfile";
import Navbar from "../Navbar/Navbar";
import Post from "../Post/Post";

const Profile: React.FC = () => {
  const [user, setUser] = useState<IUser | null>(null);

  const fetchUser = async () => {
    const userData = await getUserDetails();
    console.log(userData);

    setUser(userData);
  };

  useEffect(() => {
    fetchUser();
    fetchPosts();
  }, []);

  const handleProfileUpdated = () => {
    fetchUser();
  };

  const handlePostUpdated = () => {
    fetchPosts();
  };

  const [isEditOpen, setIsEditOpen] = useState(false);
  const handleOpenEdit = () => {
    setIsEditOpen(true);
  };
  const handleCloseEdit = () => setIsEditOpen(false);

  const [cardsData, setCardsData] = useState<IPostWithComments[]>([]);

  const fetchPosts = async () => {
    const posts = await getPostsByUser();
    const postsWithComments: IPostWithComments[] = [];

    posts.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    for (const post of posts) {
      const comments = await getCommentsByPost(post._id);
      const postWithComments: IPostWithComments = {
        ...post,
        comments: comments,
      };

      postsWithComments.push(postWithComments);
      console.log(postsWithComments);
    }
    setCardsData(postsWithComments);
  };

  return (
    <div>
      <MDBContainer
        style={{
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
          position: "absolute",
          marginTop: "150px",
        }}
      >
        <Navbar />
        <MDBRow>
          <MDBCol lg="5">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBCardImage
                  src={
                    user?.profilePic?.includes("https")
                      ? user?.profilePic
                      : `http://localhost:3000/images/${(user?._id ?? "").replace(
                          /\//g,
                          ""
                        )}/${(user?.profilePic ?? "").replace(/\//g, "")}`
                  }
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: "300px", height: "320px" }}
                  fluid
                />
                {/* <MDBCardImage
                  src={`http://localhost:3000/images/${user?._id.replace(
                    /\//g,
                    ""
                  )}/${user?.profilePic.replace(/\//g, "")}`}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: "300px", height: "320px" }}
                  fluid
                /> */}
                <div className="d-flex justify-content-center mb-2 mt-2">
                  <MDBBtn outline className="ms-1" onClick={handleOpenEdit}>
                    Edit Profile
                  </MDBBtn>
                  <EditProfileModal
                    open={isEditOpen}
                    handleClose={handleCloseEdit}
                    user={user}
                    profilePicUrl={`http://localhost:3000/images/${user?._id}/${user?.profilePic}`}
                    onProfileUpdated={handleProfileUpdated}
                  />
                </div>
                <div className="mt-3 ">
                  <MDBCardText className="mb-1 h5">
                    {cardsData.length}
                  </MDBCardText>
                  <MDBCardText className="small text-muted mb-0">
                    Posts
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
                    <MDBCardText>User Name</MDBCardText>
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
        <MDBRow>
          <MDBCol lg="15">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol>
                    <MDBCardText>Posts</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: "60px",
                    gap: "2rem",
                    width: "100%",
                  }}
                >
                  {cardsData.map((card) => (
                    <Post
                      edit={true}
                      canDelete={true}
                      key={card._id}
                      username={card.sender}
                      content={card.content}
                      comments={card.comments}
                      likes={card.likes.length}
                      _id={card._id}
                      imageUrl={"/" + user?._id + "/" + card.imageUrl}
                      createdAt={card.createdAt}
                      profilePic={"/" + user?._id + "/" + user?.profilePic}
                      onPostUpdated={handlePostUpdated}
                    ></Post>
                  ))}
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Profile;
