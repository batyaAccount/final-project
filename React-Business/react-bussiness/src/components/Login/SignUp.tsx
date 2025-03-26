import { Box, Button, Modal, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material"
import { use, useContext, useRef, useState } from "react"
import { useNavigate } from "react-router";
import { signUp } from "../UserRedux/fetchUser";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../UserRedux/reduxStore";
import { IsloginContext } from "../Layout";

export type User = {
    id: number | undefined,
    name: string | undefined,
    email: string | undefined,
    password: string | undefined,
    roleName: string | undefined,
    token: string | undefined,
    accountantId: number | undefined,
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
    const [roleName, setRoleName] = useState<string>(''); // State for role
    const dispatch = useDispatch<AppDispatch>();
    const [, setIslogin] = useContext(IsloginContext);
    const navigate = useNavigate();
    const [isAccounter, setIsAccounter] = useState(false);
    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        const newUser = {
            name: NameRef.current?.value,
            email: mailRef.current?.value,
            password: passwordRef.current?.value,
            roleName: roleName, // Use the state for roleName
        };

        const actionResult = await dispatch(signUp({ user: newUser }));

        if (signUp.fulfilled.match(actionResult)) {
            setOpen(false);
            setIslogin(true);
            roleName == "Accounter" ? setIsAccounter(true): setIsAccounter(false);
            navigate("/HomePage", { replace: true });
        } else {
            setOpen(false);
            alert("Cant login. please enter the correct details.");
        }
    };

    return (
        <>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box sx={style}>
                    <TextField label='Name' inputRef={NameRef} fullWidth />
                    <TextField label='Email' inputRef={mailRef} fullWidth />
                    <TextField label='Password' inputRef={passwordRef} fullWidth />
                    <FormControl fullWidth>
                        <InputLabel id="role-label">Role</InputLabel>
                        <Select
                            labelId="role-label"
                            value={roleName}
                            onChange={(e) => setRoleName(e.target.value as string)} // Update state on change
                        >
                            <MenuItem value="Admin">Admin</MenuItem>
                            <MenuItem value="Client">Client</MenuItem>
                            <MenuItem value="Accountant">Accountant</MenuItem>
                        </Select>
                    </FormControl>
                    <Button onClick={handleSignUp}>
                        Sign up
                    </Button>
                </Box>
            </Modal>
        </>
    )
}

export default SignUp;
