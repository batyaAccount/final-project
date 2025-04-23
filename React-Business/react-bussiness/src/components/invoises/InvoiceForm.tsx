import axios from "axios";
import { useEffect, useState } from "react";
import { Invoice } from "../models/Invoice";
import { Modal, Box, Button, TextField, Typography } from "@mui/material";


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

export default ({ invoiceId }: { invoiceId: number }) => {
    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const [open, setOpen] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState(true);

    const getInvoiceById = async () => {
        try {
            const response = await axios.get(`https://final-project-x2ln.onrender.com/api/Recipt/${invoiceId}`);
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

    const handleChange = async (event: any) => {
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
                await axios.put(`https://final-project-x2ln.onrender.com/api/Recipt/${invoiceId}`, {
                    amount: invoice.amount,
                    category: invoice.category,
                    date: invoice.date,
                    supplier: invoice.supplier,
                });
                setOpen(!open);
                debugger
                alert("Invoice updated successfully!");
            } catch (err) {
                setOpen(!open);
                console.error(err);
            }
        }
    };
    if (isLoading) return <div>Loading...</div>;

    return (
        <Modal open={open} onClose={() => setOpen(!open)}   >
            <Box sx={style}>
                <Typography variant="h6" component="h2">
                    Edit Invoice
                </Typography>
                {invoice && (
                    <form onSubmit={handleSubmit}>
                        <TextField label="Amount" type="number" name="amount"
                            value={invoice.amount} onChange={handleChange} fullWidth margin="normal" />
                        <TextField label="Category" type="text" name="category"
                            value={invoice.category} onChange={handleChange} fullWidth margin="normal" />
                        <TextField label="Date" type="date" name="date"
                            value={invoice.date ? invoice.date.toString().substring(0, 10) : ''} onChange={handleChange} fullWidth margin="normal" />
                        <TextField label="Supplier" type="text" name="supplier"
                            value={invoice.supplier} onChange={handleChange} fullWidth margin="normal" />
                        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
                            Update Invoice
                        </Button>
                    </form>
                )}
            </Box>
        </Modal>
    );
};