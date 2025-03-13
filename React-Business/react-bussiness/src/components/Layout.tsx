import {  Outlet } from "react-router"
import NavBar from "./NavBar"
import LoginPage from "./Login/LoginPage"


export default () => {
    return (
        <>
            <NavBar></NavBar>
            <div style={{
                display: "flex", position: "absolute", alignItems: "center",
                top: "5%",
                left: "5%"
            }}>
              <LoginPage></LoginPage>
            </div>
            <Outlet></Outlet>
        </>
    )
}