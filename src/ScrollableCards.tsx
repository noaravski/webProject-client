import "./Home.css";
import { MDBNavbar, MDBNavbarBrand, MDBContainer } from "mdb-react-ui-kit";
import logo from "./assets/popcorn.png";
import Post from "./Post";
import { getPosts } from "./services/postService";
import { useEffect, useState } from "react";
import { IPostResponse } from "./services/postService";
import { useNavigate } from "react-router-dom";

const ScrollableCards = () => {
  const [cardsData, setCardsData] = useState<IPostResponse[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }

    const fetchPosts = async () => {
      const posts = await getPosts();
      setCardsData(posts);
    };
    fetchPosts();
  }, []);

  return (
    <div>
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
          flexDirection: "row",
          flexWrap: "wrap",
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
            likes={Math.floor(Math.random() * 100)}
            style={{ flexBasis: "calc(33.33%)" }}
          ></Post>
        ))}
      </div>
    </div>
  );
};

export default ScrollableCards;
