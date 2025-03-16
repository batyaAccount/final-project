import { Container, Typography } from "@mui/material";
import FileUploader from "./Files/FileUploader";
import ShowInvoices from "./invoises/showInvoises";


const HomePage = () => {

    return (
        <Container 
            maxWidth="lg" 
            sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                height: '100vh', 
            }}
        >
            <Typography variant="h2" component="h1" gutterBottom>
                <FileUploader></FileUploader>
            </Typography>
            
    
        </Container>
    );

}

export default HomePage