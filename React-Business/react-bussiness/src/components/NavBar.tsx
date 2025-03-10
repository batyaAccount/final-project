import { useContext } from "react";
import { Link, NavLink } from "react-router";
import { UserContext } from "./Manager";


const NavBar = () => {
    const [user, dispatch] = useContext(UserContext);
    return (
        <>
            <nav>
                <div style={{
                    display: "flex", position: "absolute", alignItems: "center",
                    top: "5%",
                    right: "5%"
                }}>

                    <Link to="./Recipes"> Recipes </Link>
                    {user.id ?
                        <Link to="./AddRecipeLayout" style={{ margin: "5px" }}> Add recipe </Link> : null}
                    <NavLink to='/rer' />
                     
                </div >
            </nav>
        </>
    )
}
export default NavBar;