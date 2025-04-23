import { Box, Button, Modal, TextField, Select, MenuItem, FormControl, InputLabel, Autocomplete } from "@mui/material"
import { useContext, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router";
import { signUp } from "../UserRedux/fetchUser";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../UserRedux/reduxStore";
import { IsloginContext } from "../Layout";
import axios from "axios";
import { User } from "../models/User";


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
    const [AccountantId, setAccountantId] = useState<number | undefined>(-1);
    const mailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [roleName, setRoleName] = useState<string>('');
    const [, setIslogin] = useContext(IsloginContext);
    const navigate = useNavigate();
    const [accounters, setAccounters] = useState<User[]>([]);
    const [searchTerm,] = useState('');
    const dispatch = useDispatch<AppDispatch>();


    const getAccounts = async () => {
        const response = await axios.get("https://final-project-x2ln.onrender.com/api/User");
        const data = response.data;
        setAccounters(data);
    };
    useEffect(() => { getAccounts() }, [])


    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        const newUser = {
            name: NameRef.current?.value,
            email: mailRef.current?.value,
            password: passwordRef.current?.value,
            roleName: roleName,
            accountantId: AccountantId
        };

        const actionResult = await dispatch(signUp({ user: newUser }));
        if (signUp.fulfilled.match(actionResult)) {
            setOpen(false);
            setIslogin(true);
            navigate("/HomePage", { replace: true });
        } else {
            setOpen(false);
            alert("Cannot login. Please enter the correct details.");
        }

    };

    const filteredAccountants = accounters.filter(accountant =>
        accountant.accountantId !== undefined && accountant.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box sx={style}>
                    <TextField label='Name' inputRef={NameRef} fullWidth />
                    <TextField label='Email' inputRef={mailRef} fullWidth />
                    <TextField label='Password' inputRef={passwordRef} fullWidth />
                    <FormControl fullWidth>
                        <InputLabel id="role-label">Role</InputLabel>
                        <Select labelId="role-label" onChange={(e) => setRoleName(e.target.value as string)} >
                            <MenuItem value="Admin">Admin</MenuItem>
                            <MenuItem value="Client">Client</MenuItem>
                            <MenuItem value="Accountant">Accountant</MenuItem>
                        </Select>
                    </FormControl>
                    {roleName === "Client" && (
                        <Autocomplete options={filteredAccountants} getOptionLabel={(option) => option.name || ''}
                            onChange={(_, value) => { setAccountantId(value?.id) }}
                            renderInput={(params) => (<TextField {...params} label="Select Accountant" fullWidth />)} />
                    )}
                    <Button onClick={(e) => handleSignUp(e)}>
                        Sign up
                    </Button>
                </Box>
            </Modal>
        </>
    )
}

export default SignUp;
