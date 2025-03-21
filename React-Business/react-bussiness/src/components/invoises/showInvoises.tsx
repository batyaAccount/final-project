
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
import { useEffect, useState } from "react";
import axios from "axios";
import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from "@mui/material";
import im from "../../invoice/1.png";
import im1 from "../../invoice/2.png";
import im2 from "../../invoice/3.png";
import im3 from "../../invoice/4.png";
import InvoiceForm from "./InvoiceForm";
import ShowOneInvoice from "./showOneInvoice";

type invoice = {
    s3Key: string,
    ownerId: number | undefined,
    ReceiptId: number,
};

const ShowInvoices = () => {
    const [invoices, setInvoices] = useState<Array<invoice>>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedInvoice, setSelectedInvoice] = useState<invoice | null>(null);
    const [confirmedInvoices, setConfirmedInvoices] = useState<Record<number, boolean>>({});

    const fetchInvoices = () => {
        const localInvoices: Array<invoice> = [
            { s3Key: im, ownerId: undefined, ReceiptId: 14 },
            { s3Key: im1, ownerId: undefined, ReceiptId: 14 },
            { s3Key: im2, ownerId: undefined, ReceiptId: 14 },
            { s3Key: im3, ownerId: undefined, ReceiptId: 14 },
        ];
        setInvoices(localInvoices);
        setLoading(false);
    };

    useEffect(() => {
        fetchInvoices();
    }, []);

    const handleUpdateClick = (invoice: invoice) => {
        setSelectedInvoice(invoice);
    };

    const handleApproveClick = async (invoice: invoice) => {
        try {
            await axios.put(`https://localhost:7160/api/Recipt/confirm/${invoice.ReceiptId}`);

            setConfirmedInvoices(prev => ({
                ...prev,
                [invoice.ReceiptId]: true,
            }));

            alert("The invoice was confirmed successfully!");
        } catch (err) {
            console.error(err);
            setError("Error confirming invoice");
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
                                <ShowOneInvoice key={confirmedInvoices[invoice.ReceiptId] ? `confirmed-${invoice.ReceiptId}` : `invoice-${invoice.ReceiptId}`} invoiceId={invoice.ReceiptId} />
                            </div>
                            <img
                                src={invoice.s3Key}
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
                            </div>
                        </AccordionDetails>
                    </Accordion>
                ))
            ) : (
                <Typography variant="body1" color="textSecondary" align="center">לא נמצאו חשבוניות.</Typography>
            )}
            {selectedInvoice && (
                <InvoiceForm
                    invoiceId={selectedInvoice.ReceiptId}
                    onClose={() => setSelectedInvoice(null)}
                />
            )}
        </div>
    );
};

export default ShowInvoices;
