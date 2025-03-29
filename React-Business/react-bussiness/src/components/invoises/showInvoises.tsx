import { useEffect, useState } from "react";
import axios from "axios";
import { Accordion, AccordionDetails, AccordionSummary, Button, Typography, Box, Grid, Grid2 } from "@mui/material";
import InvoiceForm from "./InvoiceForm";
import ShowOneInvoice from "./showOneInvoice";
import { useSelector } from "react-redux";
import { RootState } from "../UserRedux/reduxStore";
import { Files } from "../models/Files";
import { Invoice } from "../models/Invoice";
import { useNavigate, useParams } from "react-router";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FilterInvoiecs from "./FilterInvoices";
import { Upload } from "@mui/icons-material";

const ShowInvoices = () => {
    const [files, setFiles] = useState<Array<Files>>([]);
    const [invoiceArray, setInvoiceArray] = useState<Array<Invoice>>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedInvoice, setSelectedInvoice] = useState<Files | null>(null);
    const [confirmedInvoices, setConfirmedInvoices] = useState<Record<number, boolean>>({});
    const user = useSelector((state: RootState) => state.Auth.user);
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const url = "https://localhost:7160/api/File/";
    const fetchInvoices = async () => {
        const token = user.token;
        if (!token) {
            setError("No token found");
            setLoading(false);
            return;
        }
        try {
            const response = await axios.get(url + (id !== undefined ? `accountant/${id}` : `client`), {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const inv: Array<Files> = response.data;
            const updatedInvoices = await Promise.all(
                inv.map(async (i) => {
                    const img = await axios.get("https://localhost:7160/api/Upload/download-url/" + i.fileName, {
                        params: { userId: id !== undefined ? id : user.id?.toString() },
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
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom align="center">Invoices</Typography>
            <FilterInvoiecs fetchInvoices={fetchInvoices} files={files} setFiles={setFiles} invoiceArray={invoiceArray}></FilterInvoiecs>

            {files.length > 0 ? (
                files.map((invoice, index) => (
                    <Accordion key={index} style={{ width: '100%', marginBottom: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>
                        <AccordionSummary
                            aria-controls={`panel${index}-content`}
                            id={`panel${index}-header`}
                            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <Typography variant="h6" style={{ margin: '0' }}>Invoice {index + 1}</Typography>
                                {/* <Typography variant="body2" style={{ margin: '0' }}>
                                    {`${new Date(invoiceArray[index]?.date).toLocaleDateString() || 'N/A'}`}
                                </Typography> */}
                            </Box>
                        </AccordionSummary>


                        <AccordionDetails style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                            <div style={{ flex: 1, minWidth: '300px', maxWidth: '400px' }}>
                                <ShowOneInvoice key={confirmedInvoices[invoice.receiptId] ? `confirmed-${invoice.receiptId}` : `invoice-${invoice.receiptId}`} invoiceId={invoice.receiptId} />
                            </div>
                            <img src={invoice.imgSrc} alt={`Invoice`}
                                style={{ flex: 1, minWidth: '300px', maxWidth: '400px', objectFit: "cover", borderRadius: "8px", boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}
                            />

                            {user.accountantId === null && (
                                <Grid2 container spacing={2} direction="column" alignItems="center">
                                    <Grid item>
                                        <Button variant="contained" color="primary" onClick={() => handleUpdateClick(invoice)} style={{ marginBottom: '10px' }}>
                                            Update
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="contained" color="success" onClick={() => handleApproveClick(invoice)} style={{ marginBottom: '10px' }}>
                                            Confirm
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="contained" color="error" onClick={() => handleDelete(invoice)} style={{ marginBottom: '10px' }}>
                                            Delete
                                        </Button>
                                    </Grid>
                                </Grid2>
                            )}
                        </AccordionDetails>
                    </Accordion>
                ))
            )
                : (
                    <Typography variant="body1" color="textSecondary" align="center">No invoices found.</Typography>
                )}
            {selectedInvoice && (
                <InvoiceForm invoiceId={selectedInvoice.receiptId} />
            )}
            {id !== undefined && (<>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/Uplaod Invoice/" + id, { replace: true })}
                    startIcon={<Upload />}
                >
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/Accountant", { replace: true })}
                    style={{ marginBottom: '20px', position: 'absolute', left: '40px' }}
                    startIcon={<ArrowBackIcon />}>
                </Button>
            </>
            )
            }
        </div>

    );
};

export default ShowInvoices;
