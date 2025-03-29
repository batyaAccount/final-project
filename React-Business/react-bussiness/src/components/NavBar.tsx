import {   AppBar, styled, Toolbar, Button, IconButton } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, Upload, ExitToApp } from '@mui/icons-material'; 
import Userdetails from "./Login/Userdetails";
import { useContext } from "react";
import { IsloginContext } from "./Layout";

const NavLinkStyled = styled(NavLink)(({ theme }) => ({
    margin: theme.spacing(1),
    textDecoration: 'none',
    color: 'white',
    padding: theme.spacing(1, 2),
    borderRadius: '5px',

}));
const NavBar = () => {
    const isLoggedIn = sessionStorage.getItem('user');
    const navigate = useNavigate();
    const [ ,setIslogin] = useContext(IsloginContext);
    if (!isLoggedIn) {
        return null;
    }

    const Logout = () => {
        console.log("logout");
        sessionStorage.clear();
        setIslogin(false);
        navigate("/", { replace: true });
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <NavLinkStyled to='/ShowInvoices'>
                    <IconButton color="inherit">
                        <Home /> 
                    </IconButton>
                    Invoices
                </NavLinkStyled>
                <NavLinkStyled to='/Uplaod Invoice'>
                    <IconButton color="inherit">
                        <Upload />
                    </IconButton>
                    Upload Invoices
                </NavLinkStyled>

                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                    <Userdetails />
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ marginLeft: '10px' }}
                        onClick={Logout}
                    >
                        <ExitToApp />
                        Log Out
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
