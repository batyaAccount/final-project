import { AppBar, Toolbar, Container } from "@mui/material";
import { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import HomePage from "../HomePage";
import { motion } from "framer-motion";

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
        <>
            <AppBar  color="transparent" position="static" style={{ color: " #4f46e5" }}>
                <Toolbar>
                    <div style={{ marginLeft: 'auto', display: 'flex', }}>
                        <motion.button
                            style={{
                                padding: '1rem 2rem', // px-8 py-4
                                background: 'linear-gradient(to right, #3b82f6, #8b5cf6)', // bg-gradient-to-r from-blue-600 to-purple-600
                                borderRadius: '9999px', // rounded-full
                                color: 'white', // text-white
                                fontWeight: 'bold', // font-bold
                                fontSize: '1.125rem', // text-lg
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', // shadow-lg
                            }} whileHover={{
                                scale: 1.05,
                                boxShadow: "0 0 30px rgba(79, 70, 229, 0.6)",
                            }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleLoginClick}
                        >
                            Sign In
                        </motion.button>
                        <motion.button
                            style={{
                                padding: '1rem 2rem', // px-8 py-4
                                background: 'linear-gradient(to right, #3b82f6, #8b5cf6)', // bg-gradient-to-r from-blue-600 to-purple-600
                                borderRadius: '9999px', // rounded-full
                                color: 'white', // text-white
                                fontWeight: 'bold', // font-bold
                                fontSize: '1.125rem', // text-lg
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', // shadow-lg
                            }} whileHover={{
                                scale: 1.05,
                                boxShadow: "0 0 30px rgba(79, 70, 229, 0.6)",
                            }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleRegisterClick}
                        >
                            Sign Up
                        </motion.button>

                    </div>
                </Toolbar>
                {showLogin && <SignIn />}
                {showRegister && <SignUp />}
            </AppBar>

            <Container maxWidth={false} sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                padding: "0px"
            }}>
                <HomePage />
            </Container>
        </>
    );
};

export default LoginPage;
