import { Avatar, Button } from "@mui/material";
import { deepOrange } from '@mui/material/colors';
import { useSelector } from "react-redux";
import { RootState } from "../UserRedux/reduxStore";

const Userdetails = () => {
    const user = useSelector((state: RootState) => state.Auth.user);
    console.log(user);
    
    return (
        <>
            <div style={{
                display: "flex",
                alignItems: "center"
            }}>
                <p>{user.name}</p>                
                <Avatar sx={{ bgcolor: deepOrange[500], marginX: "10px" }}>{user.name?.charAt(0)}</Avatar>

            </div>
        </>)
}

export default Userdetails;
