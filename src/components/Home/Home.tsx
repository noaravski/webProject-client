import "./Home.css";
import Navbar from "../Navbar/Navbar";
import Post from "../Post/Post";
import { getPosts } from "../../services/postService";
import { getCommentsByPost } from "../../services/commentService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IPostWithComments } from "../../services/postService";

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
    <div style={{ display: "flex", width: "100vh", flexDirection: "column" }}>
      <Navbar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "60px",
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
