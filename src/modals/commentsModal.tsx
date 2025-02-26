import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ICommentResponse } from "../services/commentService";
import Avatar from "@mui/joy/Avatar";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "16px",
};

interface CommentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  comments: ICommentResponse[];
}

const CommentsModal: React.FC<CommentsModalProps> = ({
  isOpen,
  onClose,
  comments,
}) => {
  const sortedComments = [...comments].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const getTimeAgo = (createdAt) => {
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
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={onClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isOpen}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              align="center"
            >
              Comments
            </Typography>
            <div className="divider d-flex align-items-center mb-4 mt-2"></div>
            {sortedComments.map((comment) => (
              <Box
                key={comment._id}
                sx={{ mt: 2, display: "flex", alignItems: "center" }}
              >
                <Avatar
                  size="sm"
                  src="https://i.pravatar.cc/30"
                  sx={{
                    border: "2px solid",
                    borderColor: "background.body",
                    mr: 2,
                  }}
                />
                <Box>
                  <Typography variant="body2" component="p">
                    <span style={{ fontWeight: "bold" }}>
                      {comment.sender}:
                    </span>{" "}
                    {comment.content}
                  </Typography>
                  <Typography variant="caption" component="p">
                    {getTimeAgo(comment.createdAt)}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default CommentsModal;
