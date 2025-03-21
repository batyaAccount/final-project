import { Avatar, Typography, AppBar, styled, Toolbar, Button, IconButton } from "@mui/material";
import { deepOrange } from '@mui/material/colors';
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { RootState } from "./UserRedux/reduxStore";
import { Home, Upload, ExitToApp } from '@mui/icons-material'; // Importing icons
import Userdetails from "./Login/Userdetails";

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

    if (!isLoggedIn) {
        return null;
    }

    const Logout = () => {
        console.log("logout");
        sessionStorage.clear();
        navigate("/Layout", { replace: true });
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <NavLinkStyled to='/ShowInvoices'>
                    <IconButton color="inherit">
                        <Home /> {/* Home icon */}
                    </IconButton>
                    Invoices
                </NavLinkStyled>
                <NavLinkStyled to='/Uplaod Invoice'>
                    <IconButton color="inherit">
                        <Upload /> {/* Upload icon */}
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
                        <ExitToApp /> {/* Logout icon */}
                        Log Out
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
