import React, { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTextArea as OriginalMDBTextArea,
} from "mdb-react-ui-kit";
import Navbar from "../Navbar/Navbar";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../services/postService";
import { ICreatePost } from "../../interfaces/post";

const MDBTextArea = React.forwardRef<
  unknown,
  React.ComponentProps<typeof OriginalMDBTextArea>
>((props, ref) => (
  <OriginalMDBTextArea
    {...props}
    inputRef={ref as React.MutableRefObject<HTMLTextAreaElement>}
  />
));

export default function AddPost() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { register, handleSubmit } = useForm<ICreatePost>();

  const onSubmit = async (data: ICreatePost) => {
    const { content } = data;
    try {
      const postData: ICreatePost = {
        content: content,
      };
      const post = await createPost(postData);
      if (post) {
        navigate(`/`);
      }
    } catch (error) {
      console.error("Add post error", error);
      setErrorMessage("Failed to add post. Please try again later.");
    }
  };

  return (
    <div>
      <Navbar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "60px",
          gap: "2rem",
        }}
      ></div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <MDBContainer className="container py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCard style={{ borderRadius: "15px" }}>
              <MDBCardBody
                className="text-center"
                style={{ width: "500px", height: "500px" }}
              >
                <div className="mt-3 mb-4">
                  <MDBCardImage
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                    className="rounded-circle"
                    fluid
                    style={{ width: "200px" }}
                  />
                </div>
                <MDBTextArea
                  {...register("content", { required: true })}
                  className="form-control"
                  wrapperClass="mb-4"
                  label="Description"
                  id="formControlLg"
                  size="lg"
                  maxLength={720}
                  placeholder="Enter your Description here..."
                />
                {errorMessage && (
                  <div className="text-danger mb-3">{errorMessage}</div>
                )}
                <MDBBtn
                  type="submit"
                  outline
                  rounded
                  size="lg"
                  className="mt-4"
                >
                  Upload Movie Suggestion
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBRow>
        </MDBContainer>
      </form>
    </div>
  );
}
