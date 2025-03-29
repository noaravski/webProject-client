import React, { useEffect, useState } from "react";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/joy";
import { addLike, isLiked, removeLike } from "../services/postService";

interface LikesProps {
  postId: string;
  likes: number;
  setLikes: React.Dispatch<React.SetStateAction<number>>;
}
const Likes: React.FC<LikesProps> = ({ postId, likes, setLikes }) => {
  const [isLikedState, setIsLikedState] = useState(false);

  useEffect(() => {
    const checkIfLiked = async () => {
      try {
        const liked = await isLiked(postId);
        setIsLikedState(liked);
      } catch (error) {
        console.error("Error checking if the post is liked:", error);
      }
    };

    checkIfLiked();
  }, [postId]);

  const handleClick = async () => {
    if (!isLikedState) {
      try {
        await addLike(postId);
        setIsLikedState(true);
        setLikes(likes + 1);
      } catch (error) {
        console.error("Error liking the post:", error);
      }
    } else {
      try {
        await removeLike(postId);
        setIsLikedState(false);
        setLikes(likes - 1);
      } catch (error) {
        console.error("Error unliking the post:", error);
      }
    }
  };

  return (
    <IconButton
      variant="plain"
      color={isLikedState ? "danger" : "neutral"}
      size="sm"
      onClick={handleClick}
    >
      {isLikedState ? <FavoriteIcon /> : <FavoriteBorder />}
    </IconButton>
  );
};

export default Likes;
