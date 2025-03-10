import { Box, Button, Grid2, Modal, TextField } from "@mui/material"
import { createContext, useContext, useRef, useState } from "react"
import axios from "axios";
import { UserContext } from "../Manager";
import Userdetails from "./Userdetails";
import { Navigate } from "react-router";
export type User = {
    Id: number | undefined,
    Name: string | undefined,
    Email: string | undefined,
    Password: string | undefined,
    RoleName: string | undefined,
    token: string | undefined
}
export type partUser = Partial<User>
const url = 'http://localhost:7160/api/Auth'
const Login = () => {
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
    const [state, setState] = useState("");
    const [isLogin, setIsLogin] = useState(false)
    const [open, setOpen] = useState(false)
    const [user, userDispatch] = useContext(UserContext);
    const NameRef = useRef<HTMLInputElement>(null);
    const mailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const roleNameRef = useRef<HTMLInputElement>(null);
    return (
        <>
            <Navigate to="HomePage" replace />
            <Grid2 container spacing={2}>
                <Grid2 size={2}>
                    <div style={{ display: "flex", alignItems: "center" }} >
                        {(!isLogin) ?
                            <>
                                <div style={{ display: 'flex' }}>
                                    <Button color="primary" variant="contained" onClick={() => { setState("login"); setOpen(!open) }}>Login</Button>
                                    <Button color="primary" variant="contained" onClick={() => { setState("register"); setOpen(!open) }}>Register</Button>
                                </div></> :
                            <Userdetails></Userdetails>}</div>
                </Grid2>
            </Grid2>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box sx={style} >
                    <TextField label='Name' inputRef={NameRef} />
                    <TextField label='Email' inputRef={mailRef} />
                    <TextField label='Password' inputRef={passwordRef} />
                    <TextField label='Role' inputRef={roleNameRef} />
                    <Button onClick={async (e) => {
                        try {
                            e.preventDefault();
                            setOpen(false);
                            const user: User = {
                                Id: undefined,
                                Name: NameRef.current?.value,
                                Email: mailRef.current?.value,
                                Password: passwordRef.current?.value,
                                RoleName: roleNameRef.current?.value,
                                token: undefined
                            }
                            debugger
                            const res = await axios.post(url + '/' + state, {
                                name: user.Name,
                                password: user.Password,
                                email: user.Email,
                                roleName: user.RoleName
                            });
                            user.Id = res.data.user.id;
                            user.token = res.data.token;
                            console.log(user);

                            userDispatch({ type: 'SET_USER', data: { ...user } });
                            if (state === 'login')
                                setIsLogin(true);
                        }
                        catch (e: any) {
                            setIsLogin(false);
                            if (e.response?.status === 401) {
                                alert('Invalid credentials')
                            }
                            if (e.response?.status === 400) {
                                alert('User already exists')
                            }
                        }
                    }}>{state}</Button>
                </Box>
            </Modal>

        </>
    )
}
export default Login