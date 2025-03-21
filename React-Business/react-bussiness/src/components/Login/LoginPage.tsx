import { AppBar, Toolbar, Button } from "@mui/material";
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

    return (
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
    );
};

export default LoginPage;
