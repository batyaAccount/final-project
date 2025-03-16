import { Avatar, Typography } from "@mui/material";
import { deepOrange } from '@mui/material/colors';
import { useSelector } from "react-redux";
import { RootState } from "../UserRedux/reduxStore";

const Userdetails = () => {
    const user = useSelector((state: RootState) => state.Auth.user);

    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Avatar sx={{ bgcolor: deepOrange[500], marginRight: "8px" }}>
                {user.name?.charAt(0)}
            </Avatar>
            <Typography variant="body1">{user.name}</Typography>
        </div>
    );
};

export default Userdetails;
