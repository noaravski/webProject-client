import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ICommentResponse } from "../services/commentService";

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
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

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
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Comments
            </Typography>
            {sortedComments.map((comment) => (
              <Box key={comment._id} sx={{ mt: 2 }}>
                <Typography variant="body2" component="p">
                  <span style={{ fontWeight: "bold" }}>{comment.sender}:</span>{" "}
                  {comment.content}
                </Typography>
                <Typography variant="caption" component="p">
                  {(() => {
                    const hours = Math.round(
                      (new Date().getTime() -
                        new Date(comment.createdAt).getTime()) /
                        (1000 * 60 * 60)
                    );
                    if (hours < 24) {
                      return `${hours} hours ago`;
                    } else {
                      const days = Math.round(hours / 24);
                      return `${days} days ago`;
                    }
                  })()}
                </Typography>
              </Box>
            ))}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default CommentsModal;
