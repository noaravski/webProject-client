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
import AddImage from "../AddImage/AddImage";
import { RiGeminiFill } from "react-icons/ri";
import { Spinner } from "react-bootstrap"; 
import { aiEnhanceRequest } from "../../services/aiService";

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
  const { register, handleSubmit, getValues } = useForm<ICreatePost>();
  const [image, setImage] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);
  const [textareaValue, setTextareaValue] = useState(""); 

  const onSubmit = async (data: ICreatePost) => {
    const { content } = data;

    try {
      const postData: ICreatePost = {
        content: content,
        image: image,
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

  const handleAiRequest = async () => {
    const content = getValues("content");
    if (!content) {
      setErrorMessage("Please enter text before using AI suggestions.");
      return;
    }

    setIsLoading(true);
    try {
      const aiResult = await aiEnhanceRequest(content);
      setTextareaValue(aiResult);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setErrorMessage("Failed to fetch AI suggestions. Please try again.");
    } finally {
      setIsLoading(false);
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
                  <AddImage onFileSelect={(file) => setImage(file)} />
                </div>

                <MDBTextArea
                    {...register("content", { required: true })}
                    className="form-control"
                    wrapperClass="mb-4"
                    label="Description"
                    id="formControlLg"
                    size="lg"
                    maxLength={720}
                    placeholder={`Enter your Description here...
Or get AI recommendation by entering movie name`}
                    value={textareaValue} 
                    onChange={(e) => {
                      setTextareaValue(e.target.value); 
                      setErrorMessage(null);
                    }}
                >
                  <button
                    className={`btn ${
                      isLoading ? "btn-secondary" : "btn-light"
                    }`}
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      border: "none",
                      background: "transparent",
                      padding: "8px",
                    }}
                    onClick={(e) => {
                      e.preventDefault(); 
                      handleAiRequest();
                    }}
                    disabled={isLoading}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#f0f0f0";
                      e.currentTarget.setAttribute(
                        "title",
                        "Generate AI Recommendation"
                      );
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent"; 
                      e.currentTarget.removeAttribute("title"); 
                    }}
                  >
                    {isLoading ? (
                      <Spinner
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        style={{ color: "blue" }}
                      />
                    ) : (
                      <RiGeminiFill size={20} color="blue" />
                    )}
                  </button>
                  <div
                    style={{ position: "absolute", top: "10px", right: "10px" }}
                  ></div>
                </MDBTextArea>
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
