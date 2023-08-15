import React, { useState } from "react";
import axios from 'axios';
import { Wrapper } from './FileUpload.styles';

const FileUpload = ({ onFileUpload }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        if (selectedFile) {
            // const formData = new FormData();
            // formData.append('file', selectedFile);

            // // Replace 'YOUR_UPLOAD_URL' with the actual URL to which you want to upload the file
            // axios.post('YOUR_UPLOAD_URL', formData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     }
            // })
            // .then(response => {
            //     setUploadStatus("File uploaded successfully!");
            // })
            // .catch(error => {
            //     setUploadStatus("File upload failed.");
            // });

            //Display color pallete
            onFileUpload();
        }
    };

    return (
        <Wrapper>
            <div>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload</button>
            </div>
            {uploadStatus && <p>{uploadStatus}</p>}
        </Wrapper>
    )
};

export default FileUpload;
