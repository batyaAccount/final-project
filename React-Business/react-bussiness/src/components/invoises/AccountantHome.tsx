import  { useEffect } from "react"; // Import useEffect
import { useDispatch } from "react-redux";
import { AppDispatch } from "../UserRedux/reduxStore";
import { get } from "../UserRedux/fetchClients";
import { RootState } from "../UserRedux/reduxStore";
import { useSelector } from "react-redux";
import { Button, CircularProgress, Alert, Grid, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router";

const AccountantHome = () => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.Auth.user);
    const clients = useSelector((state: RootState) => state.Clients.clients);
    const loading = useSelector((state: RootState) => state.Clients.loading);
    const error = useSelector((state: RootState) => state.Clients.error);

    const fetchClients = async () => {
        if (user && user.id) { 
            await dispatch(get({ id: user.id as number }));
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchClients(); 
        };
        fetchData();
    }, [dispatch, user?.id]); 

    return (
        <>
            {loading && <CircularProgress />}
            {error && <Alert severity="error">{error}</Alert>}
            <Grid container spacing={2} style={{ marginTop: '20px' }}>
                {clients && clients.length > 0 ? (
                    clients.map(client => (
                        <Grid item xs={12} sm={6} md={4} key={client.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5">{client.name}</Typography>
                                    <Typography color="textSecondary">{client.email}</Typography>
                                    <Button
                                        component={Link}
                                        to={`/ShowInvoices/${client.id}`}
                                        variant="outlined"
                                        color="primary"
                                        style={{ marginTop: '10px' }}
                                    >
                                        View Details
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography>No clients available.</Typography>
                )}
            </Grid>
        </>
    );
};

export default AccountantHome;
