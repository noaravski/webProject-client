import React from "react";
import axios from "axios";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/joy";

interface LikesProps {
  postId: string;
}

class Likes extends React.Component<LikesProps> {
  state = {
    likes: 0,
  };
  handleClick = async () => {
    const { postId } = this.props;
    if (this.state.likes === 0) {
      try {
        await axios.put(`http://localhost:3000/post/like/${postId}`);
        this.setState({
          likes: 1,
        });
      } catch (error) {
        console.error("Error liking the post:", error);
      }
    } else {
      try {
        await axios.put(`http://localhost:3000/posts/unlike/${postId}`);
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
