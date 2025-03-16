import { AppBar, styled, Toolbar } from "@mui/material";
import { Link, NavLink } from "react-router";

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

const NavBar = () => {
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <NavLinkStyled to='/ShowInvoices'>Invoices</NavLinkStyled>
                    <NavLinkStyled to='/Uplaod Invoice'>Upload Invoices</NavLinkStyled>
                    <NavLinkStyled to='/rer'/>
                </Toolbar>
            </AppBar>

        </>
    )
}
export default NavBar;