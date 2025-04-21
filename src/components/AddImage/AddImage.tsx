import React, { useState, useEffect } from "react";
import noPic from "../../assets/noImage.png";

const backendUrl = import.meta.env.VITE_API_URL || "https://node94.cs.colman.ac.il:4000";

interface AddImageProps {
  onFileSelect: (file: File) => void;
  currentImage?: string; // Accept the current image as a URL (string)
  defaultImage?: string;
}

const AddImage: React.FC<AddImageProps> = ({
  onFileSelect,
  currentImage,
  defaultImage = noPic,
}) => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (currentImage) {
      // Use currentImage if provided
      setPreview(
        currentImage.includes("https")
          ? currentImage
          : `${backendUrl}/images/${currentImage}`
      );
    } else {
      // Fallback to default image
      setPreview(defaultImage);
    }
  }, [currentImage, defaultImage]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string); // Update the preview with the selected file
      };
      reader.readAsDataURL(selectedFile);
      onFileSelect(selectedFile); // Pass the selected file to the parent component
    }
  };

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <label htmlFor="fileInput">
          <img
            src={preview || defaultImage} // Use preview or fallback to defaultImage
            alt="Profile Preview"
            style={{ width: "300px", height: "300px" }} // Remove borderRadius to make it square
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

export default AddImage;
