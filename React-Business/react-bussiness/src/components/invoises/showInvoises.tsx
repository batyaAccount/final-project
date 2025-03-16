import React, { useEffect, useState } from "react";
import axios from "axios";
import { User } from "../Login/SignUp";
import { Accordion, AccordionDetails, AccordionSummary, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import im from "../../invoice/1.png"
import im1 from "../../invoice/2.png"
import im2 from "../../invoice/3.png"
import im3 from "../../invoice/4.png"
import InvoiceForm from "./InvoiceForm";
import ShowOneInvoice from "./showOneInvoice";
type invoice = {
    s3Key: string,
    ownerId: number | undefined,
    ReceiptId: number,
};
// const fetchInvoices = async () => {
//     const user: User = JSON.parse(sessionStorage.getItem('user') || 'null') as User;
//     const token = user.token;

//     if (!token) {
//         setError("No token found");
//         setLoading(false);
//         return;
//     }

//     try {
//         const response = await axios.get("https://localhost:7160/api/File/editor-or-admin", {
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json'
//             }
//         });

//         const invoices = response.data;
//         setInvoices(invoices);
//     } catch (err) {
//         setError("Error fetching invoices");
//         console.error(err);
//     } finally {
//         setLoading(false);
//     }
// };

const ShowInvoices = () => {
    const [invoices, setInvoices] = useState<Array<invoice>>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedInvoice, setSelectedInvoice] = useState<invoice | null>(null); // שדה לבחור חשבונית לעדכון

    const fetchInvoices = () => {
        const localInvoices: Array<invoice> = [
            { s3Key: im, ownerId: undefined, ReceiptId: 1 },
            { s3Key: im1, ownerId: undefined, ReceiptId: 2 },
            { s3Key: im2, ownerId: undefined, ReceiptId: 3 },
            { s3Key: im3, ownerId: undefined, ReceiptId: 4 },
        ];
        setInvoices(localInvoices);
        setLoading(false);
    };

    useEffect(() => {
        fetchInvoices();
    }, []);

    const handleUpdateClick = (invoice: invoice) => {
        setSelectedInvoice(invoice); // עדכון לחשבונית שצריך לעדכן
    };

    const handleApproveClick = async (invoice: invoice) => {
        try {
            // Send the confirmation request to the API
            const response = await axios.put(`https://localhost:7160/api/Recipt/confirm/${invoice.ReceiptId}`);
            
            // Check if the response contains updated invoice data
            const updatedInvoice = response.data; // assuming it returns the updated invoice
    
            // Update the local state by modifying the specific invoice
            const updatedInvoices = invoices.map(inv =>
                inv.ReceiptId === invoice.ReceiptId ? { ...inv, ...updatedInvoice } : inv
            );
    
            // Set the state with updated invoices
            setInvoices(updatedInvoices);
    
            alert("The invoice was confirmed successfully!");
        } catch (err) {
            console.error(err);
            setError("Error confirming invoice");
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>חשבוניות</h2>
            {invoices.length > 0 ? (
                invoices.map((invoice, index) => (
                    <Accordion key={index} style={{ width: '100%', marginBottom: '5px' }}>
                        <AccordionSummary
                            aria-controls={`panel${index}-content`}
                            id={`panel${index}-header`}
                        >
                            <Typography>חשבונית {index + 1}</Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                            <div style={{ flex: 1, minWidth: '300px', maxWidth: '400px' }}>
                                <ShowOneInvoice invoiceId={invoice.ReceiptId} />
                            </div>
                            <img
                                src={invoice.s3Key}
                                alt={`Invoice`}
                                style={{ flex: 1, minWidth: '300px', maxWidth: '400px', objectFit: "cover", borderRadius: "8px" }}
                            />
                            <div>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleUpdateClick(invoice)}
                                    style={{ marginBottom: '10px' }}
                                >
                                    Update
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleApproveClick(invoice)}
                                    style={{ marginBottom: '10px' }}
                                >
                                    Confirm
                                </Button>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                ))
            ) : (
                <p>לא נמצאו חשבוניות.</p>
            )}
            {selectedInvoice && (
                <InvoiceForm
                    invoiceId={selectedInvoice.ReceiptId}
                    onClose={() => setSelectedInvoice(null)} // Move onClose here for clean handling
                />
            )}
        </div>
    );
};

export default ShowInvoices;
