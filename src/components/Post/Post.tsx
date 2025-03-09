import "../Post/Post.css";
import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import CardOverflow from "@mui/joy/CardOverflow";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Link from "@mui/joy/Link";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import ModeCommentOutlined from "@mui/icons-material/ModeCommentOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ICommentResponse, createComment } from "../../services/commentService";
import CommentsModal from "../../modals/commentsModal";
import Likes from "../../buttons/Like";
import EditPost from "../EditPost/EditPost";
import { getPostById, deletePost } from "../../services/postService";
import { ICreatePost } from "../../interfaces/post";
import ConfirmDeletion from "../ConfirmDeletion/ConfirmDeletion";

interface PostProps {
  username: string;
  content: string;
  createdAt: Date;
  likes: number;
  comments: ICommentResponse[];
  imageUrl?: string;
  _id: string;
  senderId: string;
  profilePic?: string;
  edit?: boolean;
  canDelete?: boolean;
  onPostUpdated?: () => void;
}

export default function Post({
  username,
  content,
  likes: initialLikes,
  comments: initialComments,
  _id,
  createdAt,
  imageUrl,
  profilePic,
  senderId,
  edit = false,
  canDelete = false,
  onPostUpdated,
}: PostProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [likes, setLikes] = React.useState(initialLikes);
  const [commentContent, setCommentContent] = React.useState("");
  const [comments, setComments] =
    React.useState<ICommentResponse[]>(initialComments);

  const openComments = () => setIsOpen(true);
  const closeComments = () => setIsOpen(false);

  const [post, setPost] = React.useState<ICreatePost>({ content, _id });

  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const handleOpenEdit = () => {
    setIsEditOpen(true);
  };

  const handleCloseEdit = () => setIsEditOpen(false);

  const fetchPost = async () => {
    if (edit) {
      const postData: ICreatePost = await getPostById(_id);
      setPost(postData);
    }
  };

  const handlePostUpdated = () => {
    fetchPost();
    if (onPostUpdated) {
      onPostUpdated();
    }
  };

  const handleCommentChange = async () => {
    if (commentContent.trim() !== "") {
      const newComment = await createComment(_id, commentContent);
      setComments([...comments, newComment]);
      setCommentContent("");
    }
  };

  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);

  const handleOpenDelete = () => {
    setIsDeleteOpen(true);
  };

  const handleCloseDelete = () => {
    setIsDeleteOpen(false);
  };

  const handleDeletePost = async () => {
    try {
      await deletePost(_id);
      if (onPostUpdated) {
        onPostUpdated();
      }
      console.log("Post deleted successfully");
      setPost({ content: "", _id: "" });
      handleCloseDelete();
    } catch (error) {
      console.error("Failed to delete post", error);
    }
  };

  const getTimeAgo = () => {
    const now = new Date();
    const diff = now.getTime() - new Date(createdAt).getTime();
    const diffInHours = Math.floor(diff / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) {
      return `${Math.floor(diff / (1000 * 60))} minutes ago`;
    } else if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    } else {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{ width: "80%", borderRadius: "lg", my: 2, mx: "auto" }}
    >
      <CardContent
        orientation="horizontal"
        sx={{ alignItems: "center", gap: 1 }}
      >
        <Box
          sx={{
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              m: "-2px",
              borderRadius: "50%",
              background:
                "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
            },
          }}
        >
          <Avatar
            size="sm"
            src={`http://localhost:3000/images/${profilePic}`}
            sx={{
              border: "2px solid",
              borderColor: "background.body",
            }}
          />
        </Box>
        <Typography sx={{ fontWeight: "lg" }}>{username}</Typography>
        {(edit || canDelete) && (
          <Box sx={{ marginLeft: "auto", display: "flex", gap: 1 }}>
            {edit && (
              <IconButton
                onClick={handleOpenEdit}
                variant="plain"
                color="neutral"
                size="sm"
              >
                <EditIcon />
              </IconButton>
            )}
            {canDelete && (
              <IconButton
                onClick={handleOpenDelete}
                variant="plain"
                color="neutral"
                size="sm"
              >
                <DeleteIcon />
              </IconButton>
            )}
            <EditPost
              open={isEditOpen}
              handleClose={handleCloseEdit}
              post={post}
              onPostUpdated={handlePostUpdated}
            />
          </Box>
        )}
      </CardContent>
      <CardOverflow>
        <AspectRatio ratio="4/3">
          <img
            src={`http://localhost:3000/images/${imageUrl}`}
            alt=""
            loading="lazy"
            style={{ objectFit: "cover" }}
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent
        orientation="horizontal"
        sx={{ alignItems: "center", mx: -1 }}
      >
        <Box sx={{ width: 0, display: "flex", gap: 0.5 }}>
          <Likes postId={_id} likes={likes} setLikes={setLikes} />
          <IconButton
            variant="plain"
            color="neutral"
            size="sm"
            onClick={openComments}
          >
            <ModeCommentOutlined />
          </IconButton>
        </Box>
        <Box
          sx={{ width: 0, display: "flex", flexDirection: "row-reverse" }}
        ></Box>
      </CardContent>
      <CardContent>
        <Link
          component="button"
          underline="none"
          textColor="text.primary"
          sx={{ fontSize: "sm", fontWeight: "lg" }}
        >
          {likes} likes
        </Link>
        <Typography sx={{ fontSize: "sm", textAlign: "left" }}>
          <Typography
            color="neutral"
            textColor="text.primary"
            sx={{ fontWeight: "lg" }}
          >
            {username}
          </Typography>{" "}
          {content}
        </Typography>
        {
          <Typography
            onClick={openComments}
            sx={{
              fontSize: "sm",
              color: "text.tertiary",
              my: 0.5,
              textAlign: "left",
            }}
          >
            <Link underline="none" sx={{ color: "text.tertiary" }}>
              {comments.length} comments
            </Link>
          </Typography>
        }
        <Typography
          sx={{
            fontSize: "10px",
            color: "text.tertiary",
            my: 0.5,
            textAlign: "left",
          }}
        >
          {getTimeAgo()}
        </Typography>
      </CardContent>
      <CardContent orientation="horizontal" sx={{ gap: 1 }}>
        <Input
          variant="plain"
          size="sm"
          placeholder="Add a comment…"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          sx={{ flex: 1, px: 0, "--Input-focusedThickness": "0px" }}
        />
        <Link underline="none" role="button" onClick={handleCommentChange}>
          Post
        </Link>
      </CardContent>
      <CommentsModal
        isOpen={isOpen}
        onClose={closeComments}
        comments={comments}
      />
      <ConfirmDeletion
        open={isDeleteOpen}
        onClose={handleCloseDelete}
        onConfirm={handleDeletePost}
        message="Are you sure you want to delete this post?"
      />
    </Card>
  );
}
