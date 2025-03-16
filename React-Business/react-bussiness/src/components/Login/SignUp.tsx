import { Box, Button, Modal, TextField } from "@mui/material"
import { useContext, useRef, useState } from "react"
import { Navigate, useNavigate } from "react-router";
import { signUp } from "../UserRedux/fetchUser";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../UserRedux/reduxStore";
import { IsloginContext } from "../Layout";
export type User = {
    id: number | undefined,
    name: string | undefined,
    email: string | undefined,
    password: string | undefined,
    roleName: string | undefined,
    token: string | undefined
}
export type partUser = Partial<User>
const SignUp = () => {
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
    const NameRef = useRef<HTMLInputElement>(null);
    const mailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const roleNameRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch<AppDispatch>();
   const [, setIslogin] = useContext(IsloginContext);
    
    const navigate = useNavigate();  // Initialize navigate

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        const newUser = {
            name: NameRef.current?.value,
            email: mailRef.current?.value,
            password: passwordRef.current?.value,
            roleName: roleNameRef.current?.value,
        };

        await dispatch(signUp({ user: newUser }));
        setOpen(false);
        setIslogin(true)
        navigate("/HomePage", { replace: true }); 

    };


    return (
        <>

            <Modal open={open} onClose={() => setOpen(false)}>
                <Box sx={style} >
                    <TextField label='Name' inputRef={NameRef} />
                    <TextField label='Email' inputRef={mailRef} />
                    <TextField label='Password' inputRef={passwordRef} />
                    <TextField label='Role' inputRef={roleNameRef} />
                    <Button onClick={handleSignUp} >
                        Sign up</Button>
                </Box>
            </Modal>

        </>
    )
}
export default SignUp
