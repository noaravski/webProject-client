import { MDBNavbar, MDBNavbarBrand, MDBContainer } from "mdb-react-ui-kit";
import logo from "./assets/popcorn.png";
import Post from "./Post";
import { getPosts } from "./services/postService";
import { useEffect, useState } from "react";
import { IPostResponse } from "./services/postService";

const ScrollableCards = () => {
  const [cardsData, setCardsData] = useState<IPostResponse[]>([]);

  useEffect(() => {
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
            {/* <MDBIcon fas icon="film" className="me-2" /> */}
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
        {/* <Feed></Feed> */}

        {cardsData.map((card) => (
          <Post
            username={card.sender}
            content={card.content}
            likes={Math.floor(Math.random() * 100)}
          ></Post>
        ))}
      </div>
    </div>
  );
};

export default ScrollableCards;
