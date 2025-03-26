import React, { useState } from "react";
import axios from "axios";

import {
    Box, Button, Container, LinearProgress, Typography, Paper,
    TextField
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload"; // Upload icon
import { styled } from "@mui/system";
import { useSelector } from "react-redux";
import { RootState } from "../UserRedux/reduxStore";

const HiddenInput = styled("input")({
    display: "none",
});

const FileUploader = () => {
    const [file, setFile] = useState<File | null>(null);
    const [progress, setProgress] = useState(0);
    const [uploadType, setUploadType] = useState("");

    const user = useSelector((state: RootState) => state.Auth.user);
    const token = user.token;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };


    const handleUpload = async () => {
        if (!file) return;


        try {
            // Get Presigned URL from server
            const response = await axios.get("https://localhost:7160/api/Upload/presigned-url", {
                params: { userId: user.id?.toString(), fileName: file.name, contentType: file.type, Category: uploadType, size: file.size },
            });
            const presignedUrl = response.data.url;
            // console.log(response);
            
            // Upload file to S3
            
            await axios.put(presignedUrl, file, {
                headers: {
                    "Content-Type": file.type,
                },
                onUploadProgress: (progressEvent) => {
                    const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
                    setProgress(percent);
                },
            });
     debugger
            await axios.post("https://localhost:7160/api/File/" + uploadType, {
                FileName: file.name,
                FileType: file.type,
                Size: file.size,
                S3Key: `users/${user.id}/${file.name}`,
                OwnerId: user.id?.toString(),
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            alert("הקובץ הועלה בהצלחה!");
        } catch (error) {
            console.error("שגיאה בהעלאה:", error);
        }
    }

    return (
        <Container maxWidth="sm" sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
            <Paper elevation={4} sx={{ width: "100%", padding: 4, display: "flex", flexDirection: "column", alignItems: "center", borderRadius: 3, backgroundColor: "#fff", textAlign: "center", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
                <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
                    Upload Your File
                </Typography>

                <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
                    Choose a file and upload it securely.
                </Typography>

                {/* Upload Type Input */}
                <TextField
                    label="סוג העלאה (1 - הוצאה, 2 - הכנסה)"
                    variant="outlined"
                    fullWidth
                    value={uploadType}
                    onChange={(e) => setUploadType(e.target.value)}
                    sx={{ mb: 2 }}
                />

                {/* Custom File Upload Button */}
                <label htmlFor="file-upload">
                    <HiddenInput id="file-upload" type="file" onChange={handleFileChange} />
                    <Button component="span" variant="outlined" startIcon={<CloudUploadIcon />} sx={{ borderRadius: 2, paddingX: 3, paddingY: 1, fontSize: "16px", mb: 2 }}>
                        {file ? file.name : "Choose File"}
                    </Button>
                </label>

                {/* Upload Button */}
                <Button variant="contained" color="primary" onClick={handleUpload} disabled={!file || !uploadType} sx={{ borderRadius: 2, paddingX: 4, paddingY: 1, fontSize: "16px", boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)" }}>
                    Upload File
                </Button>

                {/* Progress Bar */}
                {progress > 0 && (
                    <Box width="100%" sx={{ mt: 3 }}>
                        <Typography variant="body1">Uploading: {progress}%</Typography>
                        <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 5 }} />
                    </Box>
                )}
            </Paper>
        </Container>
    );
}

export default FileUploader;
