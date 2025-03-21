import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../UserRedux/reduxStore";

const Userdetails = () => {
    const user = useSelector((state: RootState) => state.Auth.user);

    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Avatar sx={{ bgcolor: "lightblue", marginRight: "8px" }}>
                {user.name?.charAt(0)}
            </Avatar>
        </div>
    );
};

export default Userdetails;
