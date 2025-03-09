import React, { useState, useEffect } from "react";
import noPic from "../../assets/noProfilePic.png";
import handleUpload from "../../services/fileService";

interface ProfilePicProps {
  // onFileSelect: (fileUrl: string) => void;
  onFileSelect: (file: File) => void;
  defaultImage?: string;
}

const ProfilePic: React.FC<ProfilePicProps> = ({
  onFileSelect,
  defaultImage,
}) => {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  useEffect(() => {
    if (defaultImage) {
      setPreview(defaultImage);
    }
  }, [defaultImage]);

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

export default ProfilePic;
