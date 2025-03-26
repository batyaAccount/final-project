

import { useEffect, useState } from "react";
import axios from "axios";
import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from "@mui/material";
import InvoiceForm from "./InvoiceForm";
import ShowOneInvoice from "./showOneInvoice";
import { useSelector } from "react-redux";
import { RootState } from "../UserRedux/reduxStore";
import { Files } from "../models/Files";


const ShowInvoices = () => {
    const [invoices, setInvoices] = useState<Array<Files>>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedInvoice, setSelectedInvoice] = useState<Files | null>(null);
    const [confirmedInvoices, setConfirmedInvoices] = useState<Record<number, boolean>>({});
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
    
            // טוען את התמונות בצורה אסינכרונית וממתין להן
            const updatedInvoices = await Promise.all(inv.map(async (i) => {
                const img = await axios.get("https://localhost:7160/api/Upload/download-url/" + i.fileName, {
                    params: { userId: user.id?.toString() },
                });
                i.imgSrc = img.data.downloadUrl;
                return i;
            }));
    
            setInvoices(updatedInvoices);
    
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
            debugger
            await axios.delete(`https://localhost:7160/api/File/delete/${invoice.receiptId}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                }
            });

            setConfirmedInvoices(prev => ({
                ...prev,
                [invoice.receiptId]: true,
            }));

            alert("The invoice was deleted successfully!");
        } catch (err) {
            alert("An error occurred")
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom align="center">חשבוניות</Typography>
            {invoices.length > 0 ? (
                invoices.map((invoice, index) => (
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
                            <img
                                src={invoice.imgSrc}
                                alt={`Invoice`}
                                style={{ flex: 1, minWidth: '300px', maxWidth: '400px', objectFit: "cover", borderRadius: "8px", boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}
                            />
                            <div>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleUpdateClick(invoice)}
                                    style={{ marginBottom: '10px', backgroundColor: '#1976d2', color: '#fff' }}
                                >
                                    Update
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleApproveClick(invoice)}
                                    style={{ marginBottom: '10px', backgroundColor: '#dc004e', color: '#fff' }}
                                >
                                    Confirm
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => handleDelete(invoice)}
                                    style={{ marginBottom: '10px', backgroundColor: '#dc004e', color: '#fff' }}
                                >
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
                <InvoiceForm
                    invoiceId={selectedInvoice.receiptId}
                    onClose={() => setSelectedInvoice(null)}
                />
            )}
        </div>
    );
};

export default ShowInvoices;
