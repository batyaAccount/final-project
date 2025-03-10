import { Navigate, Outlet } from "react-router"
import NavBar from "./NavBar"
import Login from "./Login/Login"


export default () => {
    return (
        <>
            <NavBar></NavBar>
            <div style={{
                display: "flex", position: "absolute", alignItems: "center",
                top: "5%",
                left: "5%"
            }}>
                <Login>
                </Login>
            </div>
            <Outlet></Outlet>
        </>
    )
}