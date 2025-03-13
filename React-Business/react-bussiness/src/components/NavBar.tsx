import { Link, NavLink } from "react-router";


const NavBar = () => {
    return (
        <>
            <nav>
                <div style={{
                    display: "flex", position: "absolute", alignItems: "center",
                    top: "5%",
                    right: "5%"
                }}>
                 
                    <NavLink to='/rer' />
                     
                </div >
            </nav>
        </>
    )
}
export default NavBar;