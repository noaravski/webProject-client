import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBNavbar,
  MDBNavbarBrand,
  MDBContainer,
  MDBInput,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import logo from "./assets/popcorn.png";
import Stars from "./buttons/Stars";
import Post from "./Post";
// import CommentsSection from "./buttons/CommentsSection";
// import Feed from "./Feed";
// import Like from "./buttons/Like";
const ScrollableCards = () => {
  const cardsData = [
    {
      id: 1,
      title: "Movie 1",
      text: "This is card 1",
      image: "https://picsum.photos/600/400?random=1",
    },
    {
      id: 2,
      title: "Card 2",
      text: "This is card 2",
      image: "https://picsum.photos/600/400?random=2",
    },
    {
      id: 3,
      title: "Card 3",
      text: "This is card 3",
      image: "https://picsum.photos/600/400?random=3",
    },
    {
      id: 4,
      title: "Card 4",
      text: "This is card 4",
      image: "https://picsum.photos/600/400?random=4",
    },
    {
      id: 5,
      title: "Card 5",
      text: "This is card 5",
      image: "https://picsum.photos/600/400?random=5",
    },
  ];

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
          <Post username="idan" title={card.title} content={card.text}></Post>
          // <MDBCard
          //   style={{
          //     width: "100%",
          //     maxWidth: "800px",
          //     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          //   }}
          //   key={card.id}
          // >
          //   <MDBCardImage
          //     src={card.image}
          //     alt={card.title}
          //     position="top"
          //   />
          //   <MDBCardBody>
          //     <MDBCardTitle>{card.title}</MDBCardTitle>
          //     <MDBCardText>{card.text}</MDBCardText>
          //     <div
          //       style={{
          //         justifyContent: "space-between",
          //         alignItems: "center",
          //         marginTop: "1rem",
          //       }}
          //     >
          //       {/* <Like></Like> */}
          //       <Stars></Stars>
          //       {/* <CommentsSection></CommentsSection> */}
          //     </div>
          //   </MDBCardBody>
          // </MDBCard>
        ))}
      </div>
    </div>
  );
};

export default ScrollableCards;
