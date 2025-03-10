import { Avatar, Button } from "@mui/material";
import { deepOrange } from '@mui/material/colors';
import  { FormEvent, useContext, useState } from "react";
import { UserContext } from "../Manager";
import UpdateDetails from "./UpdateDetails";
const Userdetails = () => {
    const [show, setShow] = useState(false)
    const [userDetails,dispatch] = useContext(UserContext)
    return (
        <>
            <div style={{
                display: "flex",
                alignItems: "center"
            }}>
                <p>{userDetails?.Name}</p>
                <Avatar sx={{ bgcolor: deepOrange[500], marginX: "10px" }}>{userDetails?.Name?.charAt(0)}</Avatar>
                <Button color="primary" variant="contained" onClick={(e: FormEvent) => { e.preventDefault(); setShow(true); }}>Update</Button>
                {show && <UpdateDetails opendefault={true} text="Update" Close={() => setShow(false)}></UpdateDetails>}
            </div>
        </>)
}

export default Userdetails;
