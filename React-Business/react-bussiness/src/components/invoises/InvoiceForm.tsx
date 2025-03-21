import axios from "axios";
import { useEffect, useState } from "react";
import { Invoice } from "../models/Invoice";
import { Modal, Box, Button, TextField, Typography } from "@mui/material";
import { Category } from "@mui/icons-material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default ({ invoiceId, onClose }: { invoiceId: number, onClose: Function }) => {
    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const getInvoiceById = async () => {
        try {
            const response = await axios.get(`https://localhost:7160/api/Recipt/${invoiceId}`);
            setInvoice(response.data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getInvoiceById();
    }, [invoiceId]);

    const handleChange = (event: any) => {
        // debugger
        if (invoice) {
            setInvoice(
                {
                    ...invoice,

                    [event.target.name]: event.target.value,
                });
        }
    };
const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (invoice) {
        try {
            await axios.put(`https://localhost:7160/api/Recipt/${invoiceId}`, {
                amount: invoice.amount,
                category: invoice.category,
                date: invoice.date, 
                supplier: invoice.supplier, 
                url: invoice.url
            });
            alert("Invoice updated successfully!");
        } catch (err) {
            console.error(err);
            // הוסף טיפול בשגיאות אם יש צורך
        }
    }
};
    if (isLoading) return <div>Loading...</div>;

    return (
        <Modal
            open={true}
            onClose={() => onClose()}
        >
            <Box sx={style}>
                <Typography variant="h6" component="h2">
                    Edit Invoice
                </Typography>
                {invoice && (
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Amount"
                            type="number"
                            name="amount"
                            value={invoice.amount}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Category"
                            type="text"
                            name="category"
                            value={invoice.category}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Date"
                            type="date"
                            name="date"
                            value={invoice.date ? invoice.date.toString().substring(0, 10) : ''}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Supplier"
                            type="text"
                            name="supplier"
                            value={invoice.supplier}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="URL"
                            type="text"
                            name="url"
                            value={invoice.url}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
                            Update Invoice
                        </Button>
                    </form>
                )}
            </Box>
        </Modal>
    );
};
