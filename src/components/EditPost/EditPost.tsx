import * as React from "react";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { ICreatePost } from "../../interfaces/post";

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBTextArea as OriginalMDBTextArea,
} from "mdb-react-ui-kit";
import AddImage from "../AddImage/AddImage";
import { updatePost } from "../../services/postService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface EditPostProps {
  open: boolean;
  handleClose: () => void;
  post: ICreatePost | null;
  onPostUpdated: () => void;
}

const MDBTextArea = React.forwardRef<
  unknown,
  React.ComponentProps<typeof OriginalMDBTextArea>
>((props, ref) => (
  <OriginalMDBTextArea
    {...props}
    inputRef={ref as React.MutableRefObject<HTMLTextAreaElement>}
  />
));

const EditPost: React.FC<EditPostProps> = ({
  open,
  handleClose,
  post,
  onPostUpdated,
}) => {
  const { register, handleSubmit } = useForm<ICreatePost>({});
  const [image, setImage] = useState<File>();

  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (data: ICreatePost) => {
    const { content } = data;
    try {
      const postData: ICreatePost = {
        content: content,
        image: image,
        _id: post?._id || "",
      };
      const updatedPost = await updatePost(postData);
      onPostUpdated();
      handleClose();
      if (updatedPost) {
        navigate(`/profile`);
      }
    } catch (error) {
      console.error("Add post error", error);
      setErrorMessage("Failed to update the post. Please try again later.");
    }
  };

  const handleCancel = () => {
    handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          className="vh-100"
          style={{
            border: "2px solid #000",
            backgroundColor: "background.paper",
          }}
        >
          <MDBContainer className="container py-5 h-100">
            <MDBRow className="justify-content-center align-items-center h-100">
              <MDBCol md="12" xl="4">
                <MDBCard style={{ borderRadius: "15px" }}>
                  <MDBCardBody className="text-center">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="mt-3 mb-4">
                        <AddImage onFileSelect={(file) => setImage(file)} />
                      </div>

                      <MDBTextArea
                        {...register("content", { required: true })}
                        className="form-control"
                        wrapperClass="mb-4"
                        label="Description"
                        id="formControlLg"
                        defaultValue={post?.content}
                        size="lg"
                        maxLength={720}
                      />
                      {errorMessage && (
                        <div className="text-danger mb-3">{errorMessage}</div>
                      )}
                      <MDBBtn
                        outline
                        rounded
                        size="lg"
                        className="mt-4"
                        type="submit"
                      >
                        Save Changes
                      </MDBBtn>
                      <MDBBtn
                        outline
                        rounded
                        size="lg"
                        className="mt-4 ms-4"
                        onClick={handleCancel}
                      >
                        Cancel
                      </MDBBtn>
                    </form>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </Modal>
    </div>
  );
};

export default EditPost;
