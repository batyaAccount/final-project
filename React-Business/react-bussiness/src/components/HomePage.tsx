import { Container, Typography } from "@mui/material";


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
                backgroundColor: '#f0f0f0',
                borderRadius: '8px',
                boxShadow: 3,
            }}
        >
            <Typography variant="h2" component="h1" gutterBottom>
                Welcome to Invoicify
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
                Easily decode and store your invoices in the cloud.
            </Typography>
        </Container>
    );

}

export default HomePage