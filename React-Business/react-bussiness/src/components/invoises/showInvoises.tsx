import { useEffect, useState } from "react";
import axios from "axios";
import { Accordion, AccordionDetails, AccordionSummary, Button, Typography, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import InvoiceForm from "./InvoiceForm";
import ShowOneInvoice from "./showOneInvoice";
import { useSelector } from "react-redux";
import { RootState } from "../UserRedux/reduxStore";
import { Files } from "../models/Files";
import { Invoice } from "../models/Invoice";

const ShowInvoices = () => {
    const [files, setFiles] = useState<Array<Files>>([]);
    const [invoiceArray, setInvoiceArray] = useState<Array<Invoice>>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedInvoice, setSelectedInvoice] = useState<Files | null>(null);
    const [confirmedInvoices, setConfirmedInvoices] = useState<Record<number, boolean>>({});
    const [filterMonth, setFilterMonth] = useState<number | null>(null);
    const [filterSupplier, setFilterSupplier] = useState<string>("");
    const user = useSelector((state: RootState) => state.Auth.user);
    const fetchInvoices = async () => {
        const token = user.token;
     
        if (!token) {
            setError("No token found");
            setLoading(false);
            return;
        }
        try {
            const response = await axios.get("https://localhost:7160/api/File/editor-or-admin", {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const inv: Array<Files> = response.data;
            const updatedInvoices = await Promise.all(
                inv.map(async (i) => {
                    const img = await axios.get("https://localhost:7160/api/Upload/download-url/" + i.fileName, {
                        params: { userId: user.id?.toString() },
                    });
                    i.imgSrc = img.data.downloadUrl;
                    return i;
                }));

            await setFiles(updatedInvoices);
            console.log(files);

            var invoices: Array<Invoice> = [];
            await Promise.all(inv.map(async (i) => {
                const res = await axios.get(`https://localhost:7160/api/Recipt/${i.receiptId}`);
                invoices.push(res.data);
            }));

            await setInvoiceArray(invoices);
            console.log(invoiceArray);

            return [invoices, updatedInvoices];
        } catch (err) {
            setError("Error fetching invoices");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvoices();
    }, []);

    const handleUpdateClick = (invoice: Files) => {
        setSelectedInvoice(invoice);
    };

    const handleApproveClick = async (invoice: Files) => {
        try {
            await axios.put(`https://localhost:7160/api/Recipt/confirm/${invoice.receiptId}`);
            setConfirmedInvoices(prev => ({
                ...prev,
                [invoice.receiptId]: true,
            }));
            alert("The invoice was confirmed successfully!");
        } catch (err) {
            console.error(err);
            setError("Error confirming invoice");
        }
    };

    const handleDelete = async (invoice: Files) => {
        try {
            await axios.delete(`https://localhost:7160/api/File/delete/${invoice.receiptId}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                }
            });
            fetchInvoices();
            setSelectedInvoice(null);
            alert("The invoice was deleted successfully!");
        } catch (err) {
            alert("An error occurred");
        }
    };
    const handleFilter = async () => {
        debugger
        var invoices = await fetchInvoices() as (Invoice[] | Files[])[];

        console.log(invoiceArray);
        console.log(files);
        let filteredFiles = invoices;

        if (filterMonth) {
            filteredFiles[0] = (filteredFiles[0] as Invoice[])?.filter(invoice => new Date(invoice.date).getMonth() + 1 === filterMonth);
        }

        if (filterSupplier) {
            filteredFiles[1] = (filteredFiles[0] as Invoice[])?.filter(invoice => invoice.supplier.includes(filterSupplier));
        }
        var ff = (filteredFiles[1] as Files[]).filter(f => (filteredFiles[0] as Invoice[])?.find(f1 => f1.id == f.receiptId))
        setFiles(ff);
    };

    const resetFilters = () => {
        setFilterMonth(null);
        setFilterSupplier("");
        fetchInvoices();
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom align="center">חשבוניות</Typography>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', gap: '10px' }}>
                <FormControl variant="outlined" style={{ minWidth: 120 }}>
                    <InputLabel>חודש</InputLabel>
                    <Select value={filterMonth || ""} onChange={(e: any) => setFilterMonth(e.target.value)} label="חודש" >
                        <MenuItem value=""><em>כל החודשים</em></MenuItem>
                        {[...Array(12)].map((_, index) => (
                            <MenuItem key={index + 1} value={index + 1}>{index + 1}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField label="שם ספק" variant="outlined" value={filterSupplier} onChange={(e) => setFilterSupplier(e.target.value)} />
                <Button variant="contained" color="primary" onClick={handleFilter}>סנן</Button>
                <Button variant="contained" color="inherit" onClick={resetFilters}>חזור לכל החשבוניות</Button>
            </div>
            {files.length > 0 ? (
                files.map((invoice, index) => (
                    <Accordion key={index} style={{ width: '100%', marginBottom: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>
                        <AccordionSummary
                            aria-controls={`panel${index}-content`}
                            id={`panel${index}-header`}
                        >
                            <Typography variant="h6">חשבונית {index + 1}</Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                            <div style={{ flex: 1, minWidth: '300px', maxWidth: '400px' }}>
                                <ShowOneInvoice key={confirmedInvoices[invoice.receiptId] ? `confirmed-${invoice.receiptId}` : `invoice-${invoice.receiptId}`} invoiceId={invoice.receiptId} />
                            </div>
                            <img src={invoice.imgSrc} alt={`Invoice`}
                                style={{ flex: 1, minWidth: '300px', maxWidth: '400px', objectFit: "cover", borderRadius: "8px", boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}
                            />
                            <div>
                                <Button variant="contained" color="primary" onClick={() => handleUpdateClick(invoice)} style={{ marginBottom: '10px' }}>
                                    Update
                                </Button>
                                <Button variant="contained" color="secondary" onClick={() => handleApproveClick(invoice)} style={{ marginBottom: '10px' }} >
                                    Confirm
                                </Button>
                                <Button variant="contained" color="error" onClick={() => handleDelete(invoice)} style={{ marginBottom: '10px' }} >
                                    Delete
                                </Button>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                ))
            ) : (
                <Typography variant="body1" color="textSecondary" align="center">לא נמצאו חשבוניות.</Typography>
            )}
            {selectedInvoice && (
                <InvoiceForm invoiceId={selectedInvoice.receiptId} />
            )}
        </div>
    );
};

export default ShowInvoices;
