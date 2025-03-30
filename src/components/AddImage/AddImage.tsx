import React, { useState } from "react";
import noPic from "../../assets/noImage.png";

interface AddImageProps {
  onFileSelect: (file: File) => void;
}

const AddImage: React.FC<AddImageProps> = ({ onFileSelect }) => {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
      onFileSelect(selectedFile);
    }
  };

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <label htmlFor="fileInput">
          {preview ? (
            <img
              src={preview as string}
              alt="Profile Preview"
              style={{ width: "150px", height: "150px", borderRadius: "50%" }}
            />
          ) : (
            <img
              src={noPic}
              alt="Profile Preview"
              style={{ width: "150px", height: "150px", borderRadius: "50%" }}
            />
          )}
          <input
            id="fileInput"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </label>
      </div>
    </div>
  );
};

export default AddImage;
