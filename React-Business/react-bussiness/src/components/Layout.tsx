import { Outlet } from "react-router";
import NavBar from "./NavBar";
import LoginPage from "./Login/LoginPage";
import { createContext, useState } from "react";
import { Container, Box } from "@mui/material"; // Importing MUI components
import { useSelector } from "react-redux";
import { RootState } from "./UserRedux/reduxStore";

export const IsloginContext = createContext<any>(undefined);

const Layout = () => {

    const user = useSelector((state: RootState) => state.Auth.user);
    const [islogin, setIslogin] = useState((user.id ? true : false));

    return (
        <IsloginContext.Provider value={[islogin, setIslogin]}>
            {islogin && <NavBar />}
            {!islogin && <LoginPage />}
            <Container style={{}}>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="flex-start"
                    style={{ width: "100%", padding: "0px" }}
                >

                </Box>
                <Outlet />
            </Container>
        </IsloginContext.Provider>
    );
};

export default Layout;
