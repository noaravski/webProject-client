import React, { useState } from 'react';
import noPic from '../../assets/noProfilePic.png';
import handleUpload from '../../services/fileService';


interface ProfilePicProps {
    // onFileSelect: (fileUrl: string) => void;
    onFileSelect: (file:File) => void;
}

const ProfilePic: React.FC<ProfilePicProps> = ({ onFileSelect }) => {
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
            onFileSelect(selectedFile);
            // try {
            //     const response = await handleUpload(selectedFile);
            //     console.log(response);
            //     onFileSelect(response.data.fileUrl);
            // } catch (error) {
            //     console.error('Error uploading file', error);
            // }
        }
    };

    return (
        <div>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <label htmlFor="fileInput">
                    {preview ? (
                        <img
                            src={preview as string}
                            alt="Profile Preview"
                            style={{ width: '150px', height: '150px', borderRadius: '50%' }}
                        />
                    ) : (
                        <img
                            src={noPic}
                            alt="Profile Preview"
                            style={{ width: '150px', height: '150px', borderRadius: '50%' }}
                        />
                    )}
                    <input
                        id="fileInput"
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                </label>
            </div>
        </div>
    );
};

export default ProfilePic;