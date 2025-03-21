import { Outlet } from "react-router";
import NavBar from "./NavBar";
import LoginPage from "./Login/LoginPage";
import { createContext, useState } from "react";
import { Container, Box } from "@mui/material"; // Importing MUI components

export const IsloginContext = createContext<any>(undefined);

const Layout = () => {
    const [islogin, setIslogin] = useState(false);

    return (
        <IsloginContext.Provider value={[islogin, setIslogin]}>
            <NavBar />
            <Container maxWidth="md" style={{ marginTop: "20px" }}>
                <Box 
                    display="flex" 
                    justifyContent="center" 
                    alignItems="flex-start" // Align items to the top
                    style={{ width: "100%", marginBottom: "20px" }} // Set width for full width
                >
                    <LoginPage />
                </Box>
                <Outlet />
            </Container>
        </IsloginContext.Provider>
    );
};

export default Layout;
