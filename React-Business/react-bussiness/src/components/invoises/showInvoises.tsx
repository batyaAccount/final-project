"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import type { RootState } from "../UserRedux/reduxStore"
import type { Files } from "../models/Files"
import type { Invoice } from "../models/Invoice"
import { useNavigate, useParams } from "react-router"
import { motion, AnimatePresence } from "framer-motion"
import { Accordion, AccordionDetails, AccordionSummary, Button, Card, CardContent } from "@mui/material"
import { ArrowLeft, Upload, Pencil, Check, Trash2, AlertCircle, Download } from "lucide-react"
import InvoiceForm from "./InvoiceForm"
import ShowOneInvoice from "./showOneInvoice"
import FilterInvoiecs from "./FilterInvoices"
import { accordionSummary, arrow, button, button1, button2, button3, button4, card, check, div, div1, div2, div3, div4, h1, motionDiv, motionDiv1, motionDiv2, span, trash2, upload } from "./showInvoicesDesign"

const ShowInvoices = () => {
    const [files, setFiles] = useState<Array<Files>>([])
    const [invoiceArray, setInvoiceArray] = useState<Array<Invoice>>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [selectedInvoice, setSelectedInvoice] = useState<Files | null>(null)
    const [confirmedInvoices, setConfirmedInvoices] = useState<Record<number, boolean>>({})
    const user = useSelector((state: RootState) => state.Auth.user)
    const { id } = useParams<{ id?: string }>()
    const navigate = useNavigate()
    const url = "https://final-project-x2ln.onrender.com/api/File/"

    const fetchInvoices = async () => {
        const token = user.token

        if (!token) {

            setError("No token found")
            setLoading(false)
            return
        }
        try {
            const response = await axios.get(url + (id !== undefined ? `accountant/${id}` : `client`), {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })

            const inv: Array<Files> = response.data
            const updatedInvoices = await Promise.all(
                inv.map(async (i) => {
                    const img = await axios.get("https://final-project-x2ln.onrender.com/api/Upload/download-url/" + i.fileName, {
                        params: { userId: id !== undefined ? id : user.id?.toString() },
                    })
                    i.imgSrc = img.data.downloadUrl
                    return i
                }),
            )

            await setFiles(updatedInvoices)
            console.log(files)

            var invoices: Array<Invoice> = []
            await Promise.all(
                inv.map(async (i) => {
                    const res = await axios.get(`https://final-project-x2ln.onrender.com/api/Recipt/${i.receiptId}`)
                    invoices.push(res.data)
                }),
            )

            await setInvoiceArray(invoices)
            console.log(invoiceArray)

            return [invoices, updatedInvoices]
        } catch (err) {
            setError("Error fetching invoices")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchInvoices()
    }, [])

    const handleUpdateClick = (invoice: Files) => {
        setSelectedInvoice(invoice)
    }

    const handleApproveClick = async (invoice: Files) => {
        try {
            await axios.put(`https://final-project-x2ln.onrender.com/api/Recipt/confirm/${invoice.receiptId}`)
            setConfirmedInvoices((prev) => ({
                ...prev,
                [invoice.receiptId]: true,
            }))
            alert("The invoice was confirmed successfully!")
        } catch (err) {
            console.error(err)
            setError("Error confirming invoice")
        }
    }

    const handleDelete = async (invoice: Files) => {
        try {
            await axios.delete(`https://final-project-x2ln.onrender.com/api/File/delete/${invoice.receiptId}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            })
            fetchInvoices()
            setSelectedInvoice(null)
            alert("The invoice was deleted successfully!")
        } catch (err) {
            alert("An error occurred")
        }
    }

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 },
    }

    return (
        <div
            style={div}>
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                style={{ textAlign: 'center', marginBottom: '2rem' }}
            >
                <h1 style={h1}>Invoices</h1>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{ marginBottom: '2rem' }}>
                <FilterInvoiecs fetchInvoices={fetchInvoices} files={files} setFiles={setFiles} invoiceArray={invoiceArray} />
            </motion.div>

            {loading ? (
                <div style={div1}>
                    <div style={div2}>

                    </div>
                </div>
            ) : error ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={motionDiv}>
                    <AlertCircle style={{ color: 'rgb(239, 68, 68)' }} />
                    <span>{error}</span>
                </motion.div>
            ) : (
                <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
                    {files.length > 0 ? (
                        files.map((invoice, index) => (
                            <motion.div key={index} variants={item}>
                                <Accordion component="div" className="w-full" style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                }}>
                                    <AccordionSummary style={accordionSummary}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                        <div style={div3}>
                                            <span style={span}>Invoice {index + 1}</span>
                                        </div>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div style={div4}>
                                            <Card style={card}>
                                                <CardContent style={{
                                                    padding: '1rem'
                                                }}>
                                                    <ShowOneInvoice
                                                        key={
                                                            confirmedInvoices[invoice.receiptId]
                                                                ? `confirmed-${invoice.receiptId}`
                                                                : `invoice-${invoice.receiptId}`
                                                        }
                                                        invoiceId={invoice.receiptId}
                                                    />
                                                </CardContent>
                                            </Card>

                                            <motion.div
                                                whileHover={{ scale: 1.02 }}
                                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                                style={motionDiv1}>
                                                <img src={invoice.imgSrc || "/placeholder.svg"}
                                                    alt={`Invoice`}
                                                    style={{ width: '100%', height: '100%' }} />
                                                <div
                                                    onClick={async () => {
                                                        try {
                                                            const response = await fetch(invoice.imgSrc);
                                                            if (!response.ok) {
                                                                throw new Error('Network response was not ok');
                                                            }
                                                            const blob = await response.blob();
                                                            const link = document.createElement('a');
                                                            link.href = URL.createObjectURL(blob);
                                                            link.download = `Invoice_${invoice.receiptId}.png`;
                                                            document.body.appendChild(link);
                                                            link.click();
                                                            document.body.removeChild(link);
                                                            URL.revokeObjectURL(link.href);
                                                        } catch (error) {
                                                            console.error('Error downloading the image:', error);
                                                            alert('Failed to download the invoice image.');
                                                        }
                                                    }}
                                                    style={motionDiv2}
                                                >
                                                    <Download size={20} />
                                                </div>
                                            </motion.div>
                                        </div>
                                        {(user.accountantId === null || user.accountantId === -1) && (
                                            <div className="flex flex-col gap-3 justify-center">
                                                <Button
                                                    variant="outlined"
                                                    style={button}
                                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(37, 99, 235, 0.3)'}
                                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(37, 99, 235, 0.2)'} onClick={() => handleUpdateClick(invoice)}
                                                >
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Update
                                                </Button>

                                                <Button
                                                    variant="outlined"
                                                    style={button1}
                                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(22, 163, 74, 0.3)'}
                                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(22, 163, 74, 0.2)'} onClick={() => handleApproveClick(invoice)}
                                                >
                                                    <Check style={check} />
                                                    Confirm
                                                </Button>

                                                <Button
                                                    variant="outlined"
                                                    style={button2}
                                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(248, 113, 113, 0.3)'}
                                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(248, 113, 113, 0.2)'} onClick={() => handleDelete(invoice)}
                                                >
                                                    <Trash2 style={trash2} />
                                                    Delete
                                                </Button>

                                            </div>
                                        )}

                                    </AccordionDetails>
                                </Accordion>
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center text-white/80 text-xl p-12 backdrop-blur-sm bg-white/5 rounded-lg"
                        >
                            No invoices found.
                        </motion.div>
                    )}
                </motion.div>
            )}

            <AnimatePresence>
                {selectedInvoice && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="mt-8"
                    >
                        <Card className="backdrop-blur-xl bg-white/10 border border-white/20">
                            <CardContent className="p-6">
                                <InvoiceForm invoiceId={selectedInvoice.receiptId} />
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 flex gap-4"
            >
                {id !== undefined && (
                    <>
                        <Button
                            variant="outlined"
                            style={button3}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(128, 0, 128, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(128, 0, 128, 0.2)';
                            }} onClick={() => navigate("/Uplaod Invoice/" + id, { replace: true })}
                        >
                            <Upload style={upload} />
                            Upload Invoice
                        </Button>

                        <Button
                            variant="outlined"
                            style={button4}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 255, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 255, 0.2)';
                            }} onClick={() => navigate("/Accountant", { replace: true })}
                        >
                            <ArrowLeft style={arrow} />
                            Back to Dashboard
                        </Button>
                    </>
                )}
            </motion.div>
        </div>
    )
}
export default ShowInvoices

