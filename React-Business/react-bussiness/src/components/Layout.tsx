import { Outlet } from "react-router"
import NavBar from "./NavBar"
import LoginPage from "./Login/LoginPage"
import { createContext, Dispatch, SetStateAction, useState } from "react";

    export const IsloginContext = createContext<any>(undefined);

export default () => {

    const [islogin, setIslogin] = useState(false);


    return (
        <>
            <IsloginContext value={[islogin, setIslogin]}>
                <NavBar></NavBar>
                <div style={{
                    display: "flex", position: "absolute", alignItems: "center",
                    top: "5%",
                    left: "5%"
                }}>
                    <LoginPage></LoginPage>
                </div>
                <Outlet></Outlet>
            </IsloginContext>
        </>
    )
}