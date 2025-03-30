import { AppBar, styled, Toolbar, IconButton } from "@mui/material";
import { NavLink, useNavigate } from "react-router";
import { Home, Upload, ExitToApp } from '@mui/icons-material';
import Userdetails from "./Login/Userdetails";
import { useContext } from "react";
import { IsloginContext } from "./Layout";
import { motion } from "framer-motion";

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
    const [, setIslogin] = useContext(IsloginContext);
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
        <AppBar color="transparent" position="static" style={{ width: '100%' }}>
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
                        onClick={Logout}>
                        <ExitToApp />
                        Log Out
                    </motion.button>

                </div>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
