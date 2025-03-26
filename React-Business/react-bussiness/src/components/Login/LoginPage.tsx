import { AppBar, Toolbar, Button, Typography, Container } from "@mui/material";
import { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const LoginPage = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const userData = JSON.parse(sessionStorage.getItem('user') || '{}');

    const handleLoginClick = () => {
        setShowLogin(true);
        setShowRegister(false);
    };

    const handleRegisterClick = () => {
        setShowRegister(true);
        setShowLogin(false);
    };

    if (userData.token) {
        return <></>;
    }

    return (<>
        <Container sx={{
            display: 'flex',
            flexDirection: 'column', 
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%'
        }}>
            <AppBar position="static">
                <Toolbar>
                    <div style={{ marginLeft: 'auto', display: 'flex' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleLoginClick}
                            style={{ marginLeft: '10px' }}
                        >
                            Sign In
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleRegisterClick}
                            style={{ marginLeft: '10px' }}
                        >
                            Sign Up
                        </Button>
                    </div>
                </Toolbar>

                {showLogin && <SignIn />}
                {showRegister && <SignUp />}
            </AppBar>
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
            </Container></Container>
    </>
    );
};

export default LoginPage;
