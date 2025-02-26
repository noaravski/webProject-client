import React from "react";
import axios from "axios";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/joy";
import { addLike, isLiked, removeLike } from "../services/postService";

interface LikesProps {
  postId: string;
}

class Likes extends React.Component<LikesProps> {
  state = {
    likes: 0,
  };

  async componentDidMount() {
    const { postId } = this.props;
    try {
      if (await isLiked(postId)) {
        this.setState({
          likes: 1,
        });
      }
    } catch (error) {
      console.error("Error checking if the post is liked:", error);
    }
  }
  handleClick = async () => {
    const { postId } = this.props;
    if (this.state.likes === 0) {
      try {
        addLike(postId);
        this.setState({
          likes: 1,
        });
      } catch (error) {
        console.error("Error liking the post:", error);
      }
    } else {
      try {
        removeLike(postId);
        this.setState({
          likes: 0,
        });
      } catch (error) {
        console.error("Error unliking the post:", error);
      }
    }
  };
  render() {
    return (
      <div>
        {this.state.likes == 0 ? (
          <IconButton
            variant="plain"
            color="neutral"
            size="sm"
            onClick={this.handleClick}
          >
            <FavoriteBorder />
          </IconButton>
        ) : (
          <IconButton
            variant="plain"
            color="danger"
            size="sm"
            onClick={this.handleClick}
          >
            <FavoriteIcon />
          </IconButton>
        )}
      </div>
    );
  }
}
export default Likes;
