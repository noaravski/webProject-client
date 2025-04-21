import React, { useState, useEffect } from "react";
import noPic from "../../assets/noProfilePic.png";

interface ProfilePicProps {
  onFileSelect: (file: File | null) => void; // Allow null to indicate no file selected
  defaultImage?: string;
}

const ProfilePic: React.FC<ProfilePicProps> = ({
  onFileSelect,
  defaultImage,
}) => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (defaultImage) {
      setPreview(defaultImage);
    }
  }, [defaultImage]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string); // Update the preview with the selected file
      };
      reader.readAsDataURL(selectedFile);
      onFileSelect(selectedFile); // Pass the selected file to the parent component
    } else {
      setPreview(null); // Reset preview if no file is selected
      onFileSelect(null); // Notify parent that no file is selected
    }
  };

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <label htmlFor="fileInput">
          <img
            src={preview || noPic} // Use preview or fallback to default image
            alt="Profile Preview"
            style={{ width: "150px", height: "150px", borderRadius: "50%" }}
          />
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