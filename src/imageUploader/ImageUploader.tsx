import { MDBCol, MDBBtn, MDBRow } from "mdb-react-ui-kit";
import React, { useState } from "react";
import axios from "axios";

function ImageUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  }

  async function handleUpload() {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:3000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("File uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }

  return (
    <>
      <MDBRow className="w-50 mx-auto mb-3">
        <img
          src={
        preview ||
        "https://www.lifewire.com/thmb/TRGYpWa4KzxUt1Fkgr3FqjOd6VQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg"
          }
          className="img-fluid rounded-circle"
          alt="Preview"
        />
        <div>
          <MDBBtn onClick={() => document.getElementById("fileInput")?.click()}>
        Upload
          </MDBBtn>
          <input
        hidden
        type="file"
        id="fileInput"
        onChange={handleChange}
          ></input>
        </div>
      </MDBRow>
    </>
  );
}

export default ImageUploader;
