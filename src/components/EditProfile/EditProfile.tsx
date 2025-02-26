import * as React from "react";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { updateUser } from "../../services/userService";

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBInput as OriginalMDBInput,
  MDBTextArea as OriginalMDBTextArea,
} from "mdb-react-ui-kit";
import { IUser } from "../../interfaces/user";

interface EditProfileModalProps {
  open: boolean;
  handleClose: () => void;
  user: IUser | null;
  onProfileUpdated: () => void;
}

type updatedUserData = {
  email: string;
  username: string;
  description: string;
};

const MDBInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<typeof OriginalMDBInput>
>((props, ref) => <OriginalMDBInput {...props} ref={ref} />);

const MDBTextArea = React.forwardRef<
  unknown,
  React.ComponentProps<typeof OriginalMDBTextArea>
>((props, ref) => (
  <OriginalMDBTextArea
    {...props}
    inputRef={ref as React.MutableRefObject<HTMLTextAreaElement>}
  />
));

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  open,
  handleClose,
  user,
  onProfileUpdated,
}) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<updatedUserData>({});

  const onSubmit = async (data: updatedUserData) => {
    const { email, username, description } = data;
    try {
      if (user?._id) {
        await updateUser(user?._id, email, username, description);
        onProfileUpdated();
        handleClose();
      } else {
        console.error("User ID is undefined");
      }
    } catch (error) {
      setError("username", {
        type: "manual",
        message: "Username already exists",
      });
      console.error("Update user error", error);
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
                        <MDBCardImage
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                          className="rounded-circle"
                          fluid
                          style={{ width: "150px" }}
                        />
                      </div>
                      <MDBInput
                        {...register("email", { required: true })}
                        wrapperClass="mb-4"
                        label="Email address"
                        defaultValue={user?.email}
                        id="formControlLg"
                        type="email"
                        size="lg"
                      />
                      <MDBInput
                        {...register("username", { required: true })}
                        wrapperClass="mb-4"
                        label="User Name"
                        defaultValue={user?.username}
                        id="formControlLg"
                        type="text"
                        size="lg"
                      />
                      <MDBTextArea
                        {...register("description", { required: true })}
                        className="form-control"
                        wrapperClass="mb-4"
                        label="Description"
                        id="formControlLg"
                        size="lg"
                        maxLength={720}
                        placeholder="Enter your Description here..."
                        defaultValue={user?.description}
                      />
                      {errors.username && (
                        <div className="text-danger mb-3">
                          {errors.username.message}
                        </div>
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

export default EditProfileModal;
