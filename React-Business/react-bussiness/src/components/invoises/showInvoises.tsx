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
import { ArrowLeft, Upload, Pencil, Check, Trash2, AlertCircle } from "lucide-react"
import InvoiceForm from "./InvoiceForm"
import ShowOneInvoice from "./showOneInvoice"
import FilterInvoiecs from "./FilterInvoices"

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
    const url = "https://localhost:7160/api/File/"

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
                    const img = await axios.get("https://localhost:7160/api/Upload/download-url/" + i.fileName, {
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
                    const res = await axios.get(`https://localhost:7160/api/Recipt/${i.receiptId}`)
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
            await axios.put(`https://localhost:7160/api/Recipt/confirm/${invoice.receiptId}`)
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
            await axios.delete(`https://localhost:7160/api/File/delete/${invoice.receiptId}`, {
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
            style={{
                margin: '0 auto',
                paddingLeft: '1rem',
                paddingRight: '1rem',
                paddingTop: '2rem',
                paddingBottom: '2rem',
                position: 'relative'
            }}>
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                style={{
                    textAlign: 'center',
                    marginBottom: '2rem'
                }}
            >
                <h1 style={{
                    fontSize: '2.25rem',
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                    color: 'white'
                }}>Invoices</h1>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{
                    marginBottom: '2rem'
                }}            >
                <FilterInvoiecs fetchInvoices={fetchInvoices} files={files} setFiles={setFiles} invoiceArray={invoiceArray} />
            </motion.div>

            {loading ? (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '3rem',
                    marginBottom: '3rem'
                }}>
                    <div style={{
                        width: '4rem',
                        height: '4rem',
                        borderRadius: '50%',
                        borderWidth: '0.25rem',
                        borderStyle: 'solid',
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                        borderTopColor: 'white',
                        animation: 'spin 1s linear infinite'
                    }}></div>
                </div>
            ) : error ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                        backgroundColor: 'rgba(255, 0, 0, 0.2)',
                        backdropFilter: 'blur(4px)',
                        color: 'white',
                        padding: '1.5rem',
                        borderRadius: '0.5rem',
                        marginBottom: '2rem',
                        border: '1px solid rgba(255, 0, 0, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                    }}

                >
                    <AlertCircle style={{
                        color: 'rgb(239, 68, 68)'
                    }} />
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
                                    <AccordionSummary style={{
                                        paddingLeft: '1.5rem',
                                        paddingRight: '1.5rem',
                                        paddingTop: '1rem',
                                        paddingBottom: '1rem',
                                        transition: 'all 0.3s ease',
                                    }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'} // hover:bg-white/5
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center'
                                        }}>
                                            <span style={{
                                                fontSize: '1.25rem',
                                                fontWeight: '600'
                                            }}>Invoice {index + 1}</span>
                                        </div>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div style={{
                                            padding: '1rem',
                                            display: 'flex',
                                            gridTemplateColumns: 'repeat(1, 1fr)',
                                            gap: '1.5rem'
                                        }}>
                                            <Card style={{
                                                backdropFilter: 'blur(4px)',
                                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                                border: 'none',
                                                overflow: 'hidden'
                                            }}>
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
                                                style={{
                                                    overflow: 'hidden',
                                                    borderRadius: '0.5rem',
                                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                                                }}
                                            >
                                                <img src={invoice.imgSrc || "/placeholder.svg"}
                                                    alt={`Invoice`}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                    }} />
                                            </motion.div>
                                        </div>
                                        {user.accountantId === null && (
                                            <div className="flex flex-col gap-3 justify-center">
                                                <Button
                                                    variant="outlined"
                                                    style={{
                                                        backgroundColor: 'rgba(37, 99, 235, 0.2)',
                                                        color: 'white',
                                                        border: '1px solid rgba(37, 99, 235, 0.5)',
                                                    }}
                                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(37, 99, 235, 0.3)'}
                                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(37, 99, 235, 0.2)'} onClick={() => handleUpdateClick(invoice)}
                                                >
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Update
                                                </Button>

                                                <Button
                                                    variant="outlined"
                                                    style={{
                                                        backgroundColor: 'rgba(22, 163, 74, 0.2)',
                                                        color: 'white',
                                                        border: '1px solid rgba(22, 163, 74, 0.5)',
                                                    }}
                                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(22, 163, 74, 0.3)'}
                                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(22, 163, 74, 0.2)'} onClick={() => handleApproveClick(invoice)}
                                                >
                                                    <Check style={{
                                                        marginRight: '0.5rem',
                                                        height: '1rem',
                                                        width: '1rem',
                                                    }} />
                                                    Confirm
                                                </Button>

                                                <Button
                                                    variant="outlined"
                                                    style={{
                                                        backgroundColor: 'rgba(248, 113, 113, 0.2)',
                                                        color: 'white',
                                                        border: '1px solid rgba(248, 113, 113, 0.5)',
                                                    }}
                                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(248, 113, 113, 0.3)'}
                                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(248, 113, 113, 0.2)'} onClick={() => handleDelete(invoice)}
                                                >
                                                    <Trash2 style={{
                                                        marginRight: '0.5rem',
                                                        height: '1rem',
                                                        width: '1rem',
                                                    }} />
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
                            style={{
                                backgroundColor: 'rgba(128, 0, 128, 0.2)',
                                color: 'white',
                                border: '1px solid rgba(128, 0, 128, 0.5)',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(128, 0, 128, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(128, 0, 128, 0.2)';
                            }} onClick={() => navigate("/Uplaod Invoice/" + id, { replace: true })}
                        >
                            <Upload style={{
                                marginRight: '0.5rem',
                                height: '1rem',
                                width: '1rem',
                            }} />
                            Upload Invoice
                        </Button>

                        <Button
                            variant="outlined"
                            style={{
                                backgroundColor: 'rgba(0, 0, 255, 0.2)',
                                color: 'white', // text-white
                                border: '1px solid rgba(0, 0, 255, 0.5)',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 255, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 255, 0.2)';
                            }} onClick={() => navigate("/Accountant", { replace: true })}
                        >
                            <ArrowLeft style={{
                                marginRight: '0.5rem',
                                height: '1rem',
                                width: '1rem',
                            }} />
                            Back to Dashboard
                        </Button>
                    </>
                )}
            </motion.div>
        </div>
    )
}

export default ShowInvoices

