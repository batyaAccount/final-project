import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, CircularProgress, Container, Grid, Paper } from "@mui/material";
import { ReceiptLong, Category, CalendarToday, Store,  CheckCircle, Cancel } from "@mui/icons-material";
import { Invoice } from "../models/Invoice";


// Invoice Component
export default ({ invoiceId }: { invoiceId: number }) => {
    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getInvoiceById = async () => {
        try {
            const response = await axios.get(`https://localhost:7160/api/Recipt/${invoiceId}`);
            // console.log("API Response:", response.data);
            if (response.data) {
                setInvoice(response.data);
                setIsLoading(false);  
            } else {
                setError("No invoice data received.");
            }
        } catch (err) {
            setError("Failed to load invoice data.");
            console.error(err);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getInvoiceById();
    }, [invoice]);  

    if (isLoading) return <CircularProgress style={{ display: "block", margin: "auto", marginTop: 50 }} />;
    if (error) return <Typography color="error">{error}</Typography>;
    if (!invoice) return <Typography>No invoice found.</Typography>;

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Card sx={{ p: 3, boxShadow: 5, borderRadius: 3 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom align="center">
                        <ReceiptLong sx={{ verticalAlign: "middle", mr: 1 }} /> Invoice Details
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Paper elevation={3} sx={{ p: 2, display: "flex", alignItems: "center" }}>
                                <Category sx={{ color: "primary.main", mr: 1 }} />
                                <Typography variant="body1"><b>Category:</b> {invoice.category}</Typography>
                            </Paper>
                        </Grid>

                        <Grid item xs={12}>
                            <Paper elevation={3} sx={{ p: 2, display: "flex", alignItems: "center" }}>
                                <CalendarToday sx={{ color: "primary.main", mr: 1 }} />
                                <Typography variant="body1"><b>Date:</b> {new Date(invoice.date).toLocaleDateString()}</Typography>
                            </Paper>
                        </Grid>

                        <Grid item xs={12}>
                            <Paper elevation={3} sx={{ p: 2, display: "flex", alignItems: "center" }}>
                                <Store sx={{ color: "primary.main", mr: 1 }} />
                                <Typography variant="body1"><b>Supplier:</b> {invoice.supplier}</Typography>
                            </Paper>
                        </Grid>

                        <Grid item xs={12}>
                            <Paper elevation={3} sx={{ p: 2, display: "flex", alignItems: "center" }}>
                                <Typography variant="body1" sx={{ fontWeight: "bold", color: "success.main" }}>
                                    Amount: ${invoice.amount}
                                </Typography>
                            </Paper>
                        </Grid>

                        <Grid item xs={12}>
                            <Paper elevation={3} sx={{ p: 2, display: "flex", alignItems: "center" }}>
                                {invoice.update ? (
                                    <CheckCircle sx={{ color: "green", mr: 1 }} />
                                ) : (
                                    <Cancel sx={{ color: "red", mr: 1 }} />
                                )}
                                <Typography variant="body1">
                                    <b>Update:</b> {invoice.update ? "Yes" : "No"}
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
};
