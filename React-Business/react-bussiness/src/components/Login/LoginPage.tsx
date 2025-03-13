import { Button, Grid2 } from "@mui/material";
import Userdetails from "./Userdetails";
import SignIn from "./SignIn";
import SignUp, { User } from "./SignUp";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../UserRedux/reduxStore";

const LoginPage = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const user = useSelector((state: RootState) => state.Auth.user);

    const handleLoginClick = () => {
        setShowLogin(true);
        setShowRegister(false);
    };


    const handleRegisterClick = () => {
        setShowRegister(true);
        setShowLogin(false);
    };

    return (
        <>
            <Grid2 container spacing={2}>
                <Grid2 size={2}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        {                            
                            (user.token == undefined ) ?
                                <>    
                                    <div style={{ display: 'flex' }}>
                                        <Button color="primary" variant="contained" onClick={handleLoginClick}>Sign in</Button>
                                        <Button color="primary" variant="contained" onClick={handleRegisterClick}>Sign up</Button>
                                    </div>
                                    {showLogin && <SignIn />}
                                    {showRegister && <SignUp />}
                                </> :
                                <Userdetails />
                        }
                    </div>
                </Grid2>
            </Grid2>
        </>
    );
};

export default LoginPage;
