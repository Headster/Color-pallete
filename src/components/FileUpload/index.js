import React, { useState } from "react";
import axios from 'axios';
import { Wrapper } from './FileUpload.styles';

const FileUpload = ({ onFileUpload, onLoading }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            onLoading(true);

            axios.post('http://3.75.175.62:8080/v1/analyze-mesh-with-object/?product_id=1', formData)
                .then(response => {
                    setUploadStatus('File uploaded successfully');
                    console.log(response.data);
                    onFileUpload(response.data);
                    onLoading(false);
                })
                .catch(error => {
                    setUploadStatus('Error uploading file');
                    console.error('Error uploading file:', error);
                });
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
