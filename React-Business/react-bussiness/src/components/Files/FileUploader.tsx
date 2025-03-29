import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Container, LinearProgress, Typography, Paper, RadioGroup, FormControlLabel, Radio, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../UserRedux/reduxStore";
import { useParams } from "react-router";
import { get } from "../UserRedux/fetchClients";

const HiddenInput = styled("input")({
    display: "none",
});

const FileUploader = () => {
    const [file, setFile] = useState<File | null>(null);
    const [progress, setProgress] = useState(0);
    const [uploadType, setUploadType] = useState("");
    const user = useSelector((state: RootState) => state.Auth.user);
    const { userId_Accountant } = useParams<{ userId_Accountant: string }>();
    const [openDialog, setOpenDialog] = useState(false);
    const [userIdForAccountant, setUserIdForAccountant] = useState<number | undefined>(undefined);
    const token = user.token;

    const dispatch = useDispatch<AppDispatch>();
    const c = useSelector((state: RootState) => state.Clients.clients);
    const fetchClients = async () => {
        if (userIdForAccountant) {
            await dispatch(get({ id: user.id as number }));
        }
    };

    useEffect(() => {
        setUserIdForAccountant(userId_Accountant ? parseInt(userId_Accountant) : undefined);
        if (user.accountantId == null && userId_Accountant === undefined) {
            setOpenDialog(true);
        }
        fetchClients();
        console.log(c);

    }, [userId_Accountant, user.accountantId]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        try {
            const response = await axios.get("https://localhost:7160/api/Upload/presigned-url", {
                params: {
                    userId: userIdForAccountant !== undefined ? userIdForAccountant.toString() : user.id?.toString(),
                    fileName: file.name, contentType: file.type, Category: uploadType, size: file.size
                },
            });
            const presignedUrl = response.data.url;

            await axios.put(presignedUrl, file, {
                headers: {
                    "Content-Type": file.type,
                },
                onUploadProgress: (progressEvent) => {
                    const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
                    setProgress(percent);
                },
            });
            await axios.post("https://localhost:7160/api/File/" + uploadType, {
                FileName: file.name,
                FileType: file.type,
                Size: file.size,
                S3Key: `users/${userIdForAccountant !== undefined ? userIdForAccountant : user.id}/${file.name}`,
                ClientId: userIdForAccountant !== undefined ? userIdForAccountant : user.id,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            alert("הקובץ הועלה בהצלחה!");
        } catch (error) {
            console.error("שגיאה בהעלאה:", error);
        }
    };

    const handleClientSelect = (clientId: number) => {
        setUserIdForAccountant(clientId);
        setOpenDialog(false);
    };

    const clients = c.map(c => [c.name, c.id]);

    return (
        <Container maxWidth="sm" sx={{
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", minHeight: "100vh"
        }}>
            <Paper elevation={4} sx={{
                width: "100%", padding: 4, display: "flex", flexDirection: "column",
                alignItems: "center", borderRadius: 3, backgroundColor: "#fff", textAlign: "center",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
            }}>
                <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
                    Upload Your File
                </Typography>
                <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
                    Choose a file and upload it securely.
                </Typography>

                <RadioGroup value={uploadType} onChange={(e) => setUploadType(e.target.value)} sx={{ mb: 2 }}>
                    <FormControlLabel value="1" control={<Radio />} label="Income" />
                    <FormControlLabel value="2" control={<Radio />} label="Expense" />
                </RadioGroup>

                <label htmlFor="file-upload">
                    <HiddenInput id="file-upload" type="file" onChange={handleFileChange} />
                    <Button component="span" variant="outlined" startIcon={<CloudUploadIcon />}
                        sx={{ borderRadius: 2, paddingX: 3, paddingY: 1, fontSize: "16px", mb: 2 }}>
                        {file ? file.name : "Choose File"}
                    </Button>
                </label>
                {userIdForAccountant && <Typography variant="body1" color="warning"
                    sx={{ mb: 3 }}>*The files will be uploaded to {userIdForAccountant} client</Typography>}

                <Button variant="contained" color="inherit" onClick={handleUpload} disabled={!file || !uploadType}
                    sx={{ borderRadius: 2, paddingX: 4, paddingY: 1, fontSize: "16px", boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)" }}>
                    Upload File
                </Button>
                {(user.accountantId== undefined) && (
                    <Button
                        variant="outlined"
                        onClick={() => setOpenDialog(true)}
                       
                        sx={{ borderRadius: 2, paddingX: 4, paddingY: 1, fontSize: "16px", mt: 2 }}
                    >
                        Select New Client
                    </Button>
                )}
                {progress > 0 && (
                    <Box width="100%" sx={{ mt: 3 }}>
                        <Typography variant="body1">Uploading: {progress}%</Typography>
                        <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 5 }} />
                    </Box>
                )}
            </Paper>
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Select a Client</DialogTitle>
                <DialogContent>
                    <Typography>Select a client to upload the file for:</Typography>
                    {clients.map(clientId => (
                        <Button key={clientId[0]} onClick={() => handleClientSelect(clientId[1] as number)} sx={{ mt: 1 }}>
                            {clientId[0]}
                        </Button>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default FileUploader;
