import "./css/Home.css";
import { MDBNavbar, MDBNavbarBrand, MDBContainer } from "mdb-react-ui-kit";
import logo from "./assets/popcorn.png";
import Post from "./Post";
import { getPosts } from "./services/postService";
import { getCommentsByPost } from "./services/commentService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IPostWithComments } from "./services/postService";

const ScrollableCards = () => {
  const [cardsData, setCardsData] = useState<IPostWithComments[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }

    const fetchPosts = async () => {
      const posts = await getPosts();
      const postsWithComments: IPostWithComments[] = [];

      for (const post of posts) {
        const comments = await getCommentsByPost(post._id);
        const postWithComments: IPostWithComments = {
          ...post,
          comments: comments,
        };

        postsWithComments.push(postWithComments);
      }
      postsWithComments.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setCardsData(postsWithComments);
    };
    fetchPosts();
  }, []);

  return (
    <div className="home">
      <MDBNavbar dark bgColor="dark" fixed="top">
        <MDBContainer fluid>
          <MDBNavbarBrand href="#profile" className="text-white">
            <img
              src={logo}
              alt="logo"
              width="30"
              height="30"
              className="d-inline-block align-text-top me-2"
            ></img>
            MovieRator
          </MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2rem",
          gap: "2rem",
        }}
      >
        {cardsData.map((card) => (
          <Post
            key={card.title}
            username={card.sender}
            content={card.content}
            comments={card.comments}
            likes={card.likes.length}
            _id={card._id}
            createdAt={card.createdAt}
          ></Post>
        ))}
      </div>
    </div>
  );
};

export default ScrollableCards;
