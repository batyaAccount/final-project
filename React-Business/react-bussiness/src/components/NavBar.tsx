import { Avatar, Typography, AppBar, styled, Toolbar, Button } from "@mui/material";
import { deepOrange } from '@mui/material/colors';
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";  // Using react-router-dom instead of 'react-router'
import { RootState } from "./UserRedux/reduxStore";

const NavLinkStyled = styled(NavLink)(({ theme }) => ({
    margin: theme.spacing(1),
    textDecoration: 'none',
    color: 'white',
    padding: theme.spacing(1, 2),
    borderRadius: '5px',
    '&:hover': {
        backgroundColor: theme.palette.secondary.main,
    },
}));

const UserDetails = () => {
    const user = useSelector((state: RootState) => state.Auth.user);

    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar sx={{ bgcolor: deepOrange[500], marginRight: "8px" }}>
                {user.name?.charAt(0)}
            </Avatar>
            <Typography variant="body1" style={{ color: 'white', marginRight: "16px" }}>
                {user.name}
            </Typography>
        </div>
    );
};

const NavBar = () => {
    const isLoggedIn = sessionStorage.getItem('user');  // Assuming 'user' is saved after login

    // If the user is not logged in, don't show the navbar
    if (!isLoggedIn) {
        return null;
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <NavLinkStyled to='/ShowInvoices'>Invoices</NavLinkStyled>
                <NavLinkStyled to='/Uplaod Invoice'>Upload Invoices</NavLinkStyled>

                {/* Aligning user details to the right */}
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                    <UserDetails />
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ marginLeft: '10px' }}
                    >
                        Log Out
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
