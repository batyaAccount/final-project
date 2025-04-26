"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../UserRedux/reduxStore"
import { get } from "../UserRedux/fetchClients"
import { Link } from "react-router"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import { Card, CardContent, Button } from "@mui/material"
import { h1, styleCard, styleDiv, styleDivLoad, styleError } from "./AccountantHomeStyle"

const AccountantHome = () => {
    const dispatch = useDispatch<AppDispatch>()
    const user = useSelector((state: RootState) => state.Auth.user)
    const clients = useSelector((state: RootState) => state.Clients.clients)
    const loading = useSelector((state: RootState) => state.Clients.loading)
    const error = useSelector((state: RootState) => state.Clients.error)

    const fetchClients = async () => {
        if (user && user.id) {
            await dispatch(get({ id: user.id as number }))
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await fetchClients()
        }
        fetchData()
    }, [dispatch, user?.id])

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
            style={styleDiv}>
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                style={{ textAlign: 'center', marginBottom: '3rem' }}
            >
                <h1 style={h1}>
                    <span style={{ position: 'relative', display: 'inline-block' }}>
                        Client Dashboard
                        <motion.span
                            style={{ position: 'absolute', top: '-1.5rem', right: '-1.5rem', color: '#fbbf24' }}
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        >
                            <Sparkles size={24} />
                        </motion.span>
                    </span>
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                    Manage your client accounts</p>
            </motion.div>

            {loading && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', marginBottom: '2rem' }}>
                    <div style={styleDivLoad}></div>
                </div>
            )}

            {error && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={styleError}>
                    {error}
                </motion.div>
            )}

            <motion.div
                variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {clients && clients.length > 0 ? (
                    clients.map((client) => (
                        <motion.div key={client.id} variants={item}>
                            <Card
                                style={styleCard}
                                className="hover:shadow-xl" >
                                <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, background: 'linear-gradient(to bottom right, rgba(37, 99, 235, 0.1), rgba(128, 0, 128, 0.1))', zIndex: 0 }} />
                                <CardContent style={{ position: 'relative', zIndex: 10, padding: '24px' }}>
                                    <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                                        <h2 style={{
                                            fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem',
                                        }}>{client.name}</h2>
                                        <p style={{
                                            color: 'rgba(255, 255, 255, 0.7)', marginBottom: '1rem',
                                        }}>{client.email}</p>

                                        <Button
                                            style={{
                                                width: '100%', background: 'linear-gradient(to right, #2563eb, #7e22ce)', color: 'white', border: 'none',
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = 'linear-gradient(to right, #1d4ed8, #5b21b6)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = 'linear-gradient(to right, #2563eb, #7e22ce)';
                                            }}                                        >
                                            <Link to={`/ShowInvoices/${client.id}`}>View Details</Link>
                                        </Button>
                                    </motion.div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="col-span-full text-center text-white/80 text-xl p-8">
                        No clients available.
                    </motion.div>
                )}
            </motion.div>
        </div >
    )
}
export default AccountantHome

