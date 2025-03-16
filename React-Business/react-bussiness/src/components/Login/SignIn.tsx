import { Box, Button, Modal, TextField } from "@mui/material";
import { FormEvent, useContext, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../UserRedux/reduxStore";
import { signIn } from "../UserRedux/fetchUser";
import { useNavigate } from 'react-router-dom';
import { IsloginContext } from "../Layout";
const SignIn = () => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const [open, setOpen] = useState(true)
    const nameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();  // Initialize navigate
    const [, setIslogin] = useContext(IsloginContext);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        const newUser = {
            name: nameRef.current?.value,
            password: passwordRef.current?.value,
        };

        var res =  await dispatch(signIn({ user: newUser }));
      
        // console.log(res);
        
        setOpen(false);
        setIslogin(true);
        navigate("/HomePage", { replace: true });
    };

    return (
        <>

            <Modal open={open} >
                <Box sx={style} >
                    <TextField label='Name' inputRef={nameRef} />
                    <TextField label='Code' inputRef={passwordRef} />
                    <Button onClick={handleSignIn}
                    >Sign In</Button>
                </Box>
            </Modal >
        </>
    )
}
export default SignIn
