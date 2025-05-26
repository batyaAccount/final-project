"use client"

import type React from "react"
import { useEffect, useState } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../UserRedux/reduxStore"
import { useParams } from "react-router"
import { get } from "../UserRedux/fetchClients"
import { AnimatePresence } from "framer-motion"
import {
    Box,
    Button,
    Container,
    LinearProgress,
    Typography,
    Paper,
    RadioGroup,
    FormControlLabel,
    Radio,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Alert,
    Fade,
    Grow,
    Slide,
} from "@mui/material"
import {
    CloudUpload as CloudUploadIcon,
    CheckCircle as CheckCircleIcon,
    Error as ErrorIcon,
    People as PeopleIcon,
    Warning as WarningIcon,
} from "@mui/icons-material"
import { styled, keyframes } from "@mui/material/styles"

// Keyframes for animations
const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`

const pulse = keyframes`
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

// Styled components with glass morphism effect
const GlassPaper = styled(Paper)(({ theme }) => ({
    backdropFilter: "blur(20px)",
    background: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "24px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    color: "white",
    padding: theme.spacing(4),
    transition: "all 0.3s ease",
    position: "relative",
    overflow: "hidden",
    "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "linear-gradient(135deg, rgba(33, 150, 243, 0.1) 0%, rgba(156, 39, 176, 0.1) 100%)",
        zIndex: 0,
    },
    "& > *": {
        position: "relative",
        zIndex: 1,
    },
}))

const GradientButton = styled(Button)(() => {
    const gradients = {
        primary: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
        success: "linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)",
        error: "linear-gradient(45deg, #f44336 30%, #ff9800 90%)",
        secondary: "linear-gradient(45deg, #9c27b0 30%, #e91e63 90%)",
        inherit: "linear-gradient(45deg, #6366f1 30%, #8b5cf6 90%)",
    }

    return {
        background: gradients.primary,
        border: 0,
        borderRadius: 25,
        color: "white",
        padding: "12px 24px",
        fontSize: "16px",
        fontWeight: "bold",
        boxShadow: `0 3px 15px rgba(0, 0, 0, 0.3)`,
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
        "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: `0 6px 25px rgba(0, 0, 0, 0.4)`,
        },
        "&:disabled": {
            background: "rgba(255, 255, 255, 0.1)",
            color: "rgba(255, 255, 255, 0.5)",
            transform: "none",
            boxShadow: "none",
        },
        "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: "-100%",
            width: "100%",
            height: "100%",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
            transition: "left 0.5s",
        },
        "&:hover::before": {
            left: "100%",
        },
    }
})

const UploadZone = styled(Box)(({  hasFile, isDragActive }: {  hasFile: boolean, isDragActive: boolean }) => ({
    border: `2px dashed ${hasFile ? "#4CAF50" : isDragActive ? "#2196F3" : "rgba(255, 255, 255, 0.3)"}`,
    borderRadius: "16px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
    background: hasFile
        ? "rgba(76, 175, 80, 0.1)"
        : isDragActive
            ? "rgba(33, 150, 243, 0.1)"
            : "rgba(255, 255, 255, 0.05)",
    position: "relative",
    overflow: "hidden",
    "&:hover": {
        background: "rgba(255, 255, 255, 0.1)",
        borderColor: "rgba(255, 255, 255, 0.5)",
        transform: "translateY(-2px)",
    },
    "&::before": {
        content: '""',
        position: "absolute",
        top: "-50%",
        left: "-50%",
        width: "200%",
        height: "200%",
        background: hasFile
            ? "radial-gradient(circle, rgba(76, 175, 80, 0.1) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)",
        animation: `${float} 3s ease-in-out infinite`,
        zIndex: 0,
    },
    "& > *": {
        position: "relative",
        zIndex: 1,
    },
}))

const AnimatedIcon = styled(CloudUploadIcon)(({ hasFile }: { hasFile: boolean }) => ({
    fontSize: 48,
    color: hasFile ? "#4CAF50" : "rgba(255, 255, 255, 0.7)",
    marginBottom: 16,
    transition: "all 0.3s ease",
    animation: hasFile ? `${pulse} 2s ease-in-out infinite` : "none",
}))

const StyledRadio = styled(Radio)(() => ({
    color: "rgba(255, 255, 255, 0.7)",
    "&.Mui-checked": {
        color: "#4CAF50",
    },
    "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
}))

const StyledFormControlLabel = styled(FormControlLabel)(() => ({
    "& .MuiFormControlLabel-label": {
        color: "white",
        fontSize: "16px",
        fontWeight: 500,
    },
    "&:hover": {
        "& .MuiFormControlLabel-label": {
            color: "#4CAF50",
        },
    },
}))

const GlassAlert = styled(Alert)(() => {
    const colors = {
        warning: {
            background: "rgba(255, 152, 0, 0.1)",
            border: "rgba(255, 152, 0, 0.3)",
            icon: "#ffb74d",
        },
        error: {
            background: "rgba(244, 67, 54, 0.1)",
            border: "rgba(244, 67, 54, 0.3)",
            icon: "#ff6b6b",
        },
        success: {
            background: "rgba(76, 175, 80, 0.1)",
            border: "rgba(76, 175, 80, 0.3)",
            icon: "#81c784",
        },
    }

    const colorConfig = colors.warning

    return {
        backdropFilter: "blur(20px)",
        background: colorConfig.background,
        border: `1px solid ${colorConfig.border}`,
        borderRadius: "12px",
        color: "white",
        "& .MuiAlert-icon": {
            color: colorConfig.icon,
        },
        "& .MuiAlert-message": {
            fontSize: "14px",
        },
    }
})

const StyledLinearProgress = styled(LinearProgress)(() => ({
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    "& .MuiLinearProgress-bar": {
        background: "linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)",
        borderRadius: 4,
    },
}))

const LoadingSpinner = styled(Box)(() => ({
    width: 20,
    height: 20,
    border: "2px solid rgba(255,255,255,0.3)",
    borderTop: "2px solid white",
    borderRadius: "50%",
    animation: `${rotate} 1s linear infinite`,
}))

const GlassDialog = styled(Dialog)(() => ({
    "& .MuiDialog-paper": {
        backdropFilter: "blur(20px)",
        background: "rgba(255, 255, 255, 0.1)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        borderRadius: "16px",
        color: "white",
    },
    "& .MuiDialogTitle-root": {
        color: "white",
        fontWeight: "bold",
        fontSize: "1.5rem",
    },
    "& .MuiDialogContent-root": {
        color: "rgba(255, 255, 255, 0.8)",
    },
}))

const ClientButton = styled(Button)(() => ({
    background: "rgba(255, 255, 255, 0.1)",
    color: "white",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "8px",
    padding: "12px 16px",
    marginTop: "8px",
    width: "100%",
    transition: "all 0.3s ease",
    "&:hover": {
        background: "rgba(255, 255, 255, 0.2)",
        transform: "translateY(-1px)",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
    },
}))

const HiddenInput = styled("input")({
    display: "none",
})

const FileUploader = () => {
    const [file, setFile] = useState<File | null>(null)
    const [progress, setProgress] = useState(0)
    const [uploadType, setUploadType] = useState("")
    const [uploading, setUploading] = useState(false)
    const [uploadComplete, setUploadComplete] = useState(false)
    const [uploadError, setUploadError] = useState<string | null>(null)
    const user = useSelector((state: RootState) => state.Auth.user)
    const { userId_Accountant } = useParams<{ userId_Accountant: string }>()
    const [openDialog, setOpenDialog] = useState(false)
    const [userIdForAccountant, setUserIdForAccountant] = useState<number | undefined>(undefined)
    const token = user.token
    const [isDragActive, setIsDragActive] = useState(false); // הוספת מצב עבור גרירה

    const dispatch = useDispatch<AppDispatch>()
    const clients = useSelector((state: RootState) => state.Clients.clients)

    const fetchClients = async () => {
        await dispatch(get({ id: user.id as number }))
    }

    useEffect(() => {
        setUserIdForAccountant(userId_Accountant ? Number.parseInt(userId_Accountant) : undefined)
        if ((user.accountantId == null || user.accountantId == -1) && userId_Accountant === undefined) {
            setOpenDialog(true)
        }
        fetchClients()
    }, [userId_Accountant, user.accountantId, user.id])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
            setProgress(0)
            setUploadComplete(false)
            setUploadError(null)
        }
    }

    const handleUpload = async () => {
        if (!file) return

        setUploading(true)
        setProgress(0)
        setUploadError(null)

        try {
            const response = await axios.get("https://final-project-x2ln.onrender.com/api/Upload/presigned-url", {
                params: {
                    userId: userIdForAccountant !== undefined ? userIdForAccountant.toString() : user.id?.toString(),
                    fileName: file.name,
                    contentType: file.type,
                    Category: uploadType,
                    size: file.size,
                },
            })

            const presignedUrl = response.data.url

            await axios.put(presignedUrl, file, {
                headers: {
                    "Content-Type": file.type,
                },
                onUploadProgress: (progressEvent) => {
                    const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1))
                    setProgress(percent)
                },
            })

            await axios.post(
                "https://final-project-x2ln.onrender.com/api/File/" + uploadType,
                {
                    FileName: file.name,
                    FileType: file.type,
                    Size: file.size,
                    S3Key: `users/${userIdForAccountant !== undefined ? userIdForAccountant : user.id}/${file.name}`,
                    ClientId: userIdForAccountant !== undefined ? userIdForAccountant : user.id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            )

            setUploadComplete(true)
            alert("הקובץ הועלה בהצלחה!")
            setTimeout(() => {
                setFile(null)
                setProgress(0)
                setUploadComplete(false)
            }, 3000)
        } catch (error) {
            console.error("שגיאה בהעלאה:", error)
            setUploadError("An error occurred during upload. Please try again.")
        } finally {
            setUploading(false)
        }
    }

    const handleClientSelect = (clientId: number) => {
        setUserIdForAccountant(clientId)
        setOpenDialog(false)
    }

    const clientList = clients.map((c) => [c.name, c.id])

    return (
        <Container
            maxWidth="sm"
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                py: 4,
            }}
        >
            <Grow in timeout={600}>
                <GlassPaper elevation={0}>
                    <Slide direction="down" in timeout={800}>
                        <Box sx={{ textAlign: "center", mb: 4 }}>
                            <Typography variant="h4" component="h1" sx={{ mb: 2, fontWeight: "bold", color: "white" }}>
                                Upload Your File
                            </Typography>
                            <Typography variant="body1" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                                Choose a file and upload it securely.
                            </Typography>
                        </Box>
                    </Slide>

                    <Fade in timeout={1000}>
                        <Box sx={{ mb: 3 }}>
                            <RadioGroup
                                value={uploadType}
                                onChange={(e) => setUploadType(e.target.value)}
                                sx={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: 2 }}
                            >
                                <StyledFormControlLabel value="1" control={<StyledRadio />} label="Income" />
                                <StyledFormControlLabel value="2" control={<StyledRadio />} label="Expense" />
                            </RadioGroup>
                        </Box>
                    </Fade>

                    <Grow in timeout={1200}>
                        <Box sx={{ mb: 3 }}>
                            <label htmlFor="file-upload">
                                <HiddenInput id="file-upload" type="file" onChange={handleFileChange} />
                                <UploadZone hasFile={!!file} isDragActive={isDragActive} onDragEnter={() => setIsDragActive(true)} onDragLeave={() => setIsDragActive(false)}>
                                <AnimatedIcon hasFile={!!file} />
                                    <Typography variant="h6" sx={{ color: "white", mb: 1 }}>
                                        {file ? file.name : "Click to select a file"}
                                    </Typography>
                                    {file && (
                                        <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.6)" }}>
                                            {(file.size / 1024 / 1024).toFixed(2)} MB
                                        </Typography>
                                    )}
                                </UploadZone>
                            </label>

                            {userIdForAccountant && (
                                <Fade in>
                                    <Box sx={{ mt: 2 }}>
                                        <GlassAlert severity="warning" icon={<WarningIcon />}>
                                            The files will be uploaded to client ID: {userIdForAccountant}
                                        </GlassAlert>
                                    </Box>
                                </Fade>
                            )}
                        </Box>
                    </Grow>

                    <AnimatePresence>
                        {uploadError && (
                            <Fade in>
                                <Box sx={{ mb: 3 }}>
                                    <GlassAlert severity="error" icon={<ErrorIcon />}>
                                        {uploadError}
                                    </GlassAlert>
                                </Box>
                            </Fade>
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {uploadComplete && (
                            <Fade in>
                                <Box sx={{ mb: 3 }}>
                                    <GlassAlert severity="success" icon={<CheckCircleIcon />}>
                                        File uploaded successfully!
                                    </GlassAlert>
                                </Box>
                            </Fade>
                        )}
                    </AnimatePresence>

                    <Slide direction="up" in timeout={1400}>
                        <Box>
                            {progress > 0 && !uploadComplete && (
                                <Box sx={{ mb: 3 }}>
                                    <Box display="flex" justifyContent="space-between" mb={1}>
                                        <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                                            Uploading
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                                            {progress}%
                                        </Typography>
                                    </Box>
                                    <StyledLinearProgress variant="determinate" value={progress} />
                                </Box>
                            )}

                            <Box display="flex" flexDirection="column" gap={2}>
                                <GradientButton
                                    fullWidth
                                    color="inherit"
                                    onClick={handleUpload}
                                    disabled={!file || !uploadType || uploading}
                                    startIcon={uploading ? <LoadingSpinner /> : <CloudUploadIcon />}
                                >
                                    {uploading ? "Uploading..." : "Upload File"}
                                </GradientButton>

                                {(user.accountantId == undefined || user.accountantId == -1) && (
                                    <GradientButton
                                        fullWidth
                                        color="secondary"
                                        onClick={() => setOpenDialog(true)}
                                        startIcon={<PeopleIcon />}
                                    >
                                        Select New Client
                                    </GradientButton>
                                )}
                            </Box>
                        </Box>
                    </Slide>
                </GlassPaper>
            </Grow>

            <GlassDialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Select a Client</DialogTitle>
                <DialogContent>
                    <Typography sx={{ mb: 2, color: "rgba(255, 255, 255, 0.7)" }}>
                        Select a client to upload the file for:
                    </Typography>
                    <Box>
                        {clientList.length > 0 ? (
                            clientList.map((client, index) => (
                                <Slide direction="right" in timeout={300 + index * 100} key={client[1] as number}>
                                    <ClientButton onClick={() => handleClientSelect(client[1] as number)}>{client[0]}</ClientButton>
                                </Slide>
                            ))
                        ) : (
                            <Typography sx={{ color: "rgba(255, 255, 255, 0.7)", textAlign: "center", py: 2 }}>
                                No clients available
                            </Typography>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setOpenDialog(false)}
                        sx={{
                            color: "white",
                            border: "1px solid rgba(255, 255, 255, 0.3)",
                            borderRadius: "8px",
                            "&:hover": {
                                background: "rgba(255, 255, 255, 0.1)",
                            },
                        }}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </GlassDialog>
        </Container>
    )
}

export default FileUploader
