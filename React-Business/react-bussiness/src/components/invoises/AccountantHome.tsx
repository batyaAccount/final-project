"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../UserRedux/reduxStore"
import { get } from "../UserRedux/fetchClients"
import { Link } from "react-router"
import { motion } from "framer-motion"

import { Sparkles } from "lucide-react"
import { Card, CardContent, Button } from "@mui/material"

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

    // Animation variants
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
        <div style={{
            maxWidth: '1200px', // container (בהנחה שזו הרוחב המקסימלי)
            marginLeft: 'auto', // mx-auto
            marginRight: 'auto', // mx-auto
            paddingLeft: '1rem', // px-4 (4 * 0.25rem)
            paddingRight: '1rem', // px-4 (4 * 0.25rem)
            paddingTop: '2rem', // py-8 (8 * 0.25rem)
            paddingBottom: '2rem', // py-8 (8 * 0.25rem)
        }}>
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                style={{
                    textAlign: 'center', // text-center
                    marginBottom: '3rem', // mb-12 (12 * 0.25rem)
                }}
            >
                <h1 style={{
                    fontSize: '2.25rem', // text-4xl (4 * 0.75rem)
                    fontWeight: 'bold', // font-bold
                    marginBottom: '0.5rem', // mb-2 (2 * 0.25rem)
                    color: 'white', // text-white
                }}>
                    <span style={{
                        position: 'relative', // relative
                        display: 'inline-block', // inline-block
                    }}>
                        Client Dashboard
                        <motion.span
                            style={{
                                position: 'absolute', // absolute
                                top: '-1.5rem', // -top-6 (6 * 0.25rem)
                                right: '-1.5rem', // -right-6 (6 * 0.25rem)
                                color: '#fbbf24', // text-yellow-300 (צבע צהוב)
                            }} animate={{ rotate: [0, 360] }}
                            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        >
                            <Sparkles size={24} />
                        </motion.span>
                    </span>
                </h1>
                <p style={{
                    fontSize: '1.25rem', // text-xl (1.25rem)
                    color: 'rgba(255, 255, 255, 0.8)', // text-white/80 (לבן עם שקיפות של 80%)
                }}>Manage your client accounts</p>
            </motion.div>

            {loading && (
                <div style={{
                    display: 'flex', // flex
                    justifyContent: 'center', // justify-center
                    marginTop: '2rem', // my-8 (8 * 0.25rem)
                    marginBottom: '2rem', // my-8 (8 * 0.25rem)
                }}>
                    <div style={{
                        width: '3rem', // w-12 (12 * 0.25rem)
                        height: '3rem', // h-12 (12 * 0.25rem)
                        borderRadius: '50%', // rounded-full
                        borderWidth: '4px', // border-4
                        borderStyle: 'solid',
                        borderColor: 'rgba(255, 255, 255, 0.2)', // border-white/20
                        borderTopColor: 'white', // border-t-white
                        animation: 'spin 1s linear infinite', // animate-spin
                    }}></div>
                </div>
            )}

            {error && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                        backgroundColor: 'rgba(239, 68, 68, 0.2)', // bg-red-500/20
                        backdropFilter: 'blur(4px)', // backdrop-blur-sm (בהנחה של 4px)
                        color: 'white', // text-white
                        padding: '1rem', // p-4 (4 * 0.25rem)
                        borderRadius: '0.5rem', // rounded-lg
                        marginBottom: '2rem', // mb-8 (8 * 0.25rem)
                        borderWidth: '1px', // border
                        borderStyle: 'solid',
                        borderColor: 'rgba(239, 68, 68, 0.5)', // border-red-500/50
                    }}
                >
                    {error}
                </motion.div>
            )}

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {clients && clients.length > 0 ? (
                    clients.map((client) => (
                        <motion.div key={client.id} variants={item}>
                            <Card style={{
                                overflow: 'hidden', // overflow-hidden
                                backdropFilter: 'blur(4px)', // backdrop-blur-sm (בהנחה של 4px)
                                backgroundColor: 'rgba(255, 255, 255, 0.1)', // bg-white/10
                                border: 'none', // border-none
                                height: '100%', // h-full
                                transition: 'all 0.3s', // transition-all duration-300
                                marginBottom:"50px"
                            }}
                                className="hover:shadow-xl" >
                                <div style={{
                                    position: 'absolute', // absolute
                                    top: 0, // inset-0
                                    right: 0, // inset-0
                                    bottom: 0, // inset-0
                                    left: 0, // inset-0
                                    background: 'linear-gradient(to bottom right, rgba(37, 99, 235, 0.1), rgba(128, 0, 128, 0.1))', // bg-gradient-to-br from-blue-500/10 to-purple-500/10
                                    zIndex: 0, // z-0
                                }} />
                                <CardContent style={{
                                    position: 'relative', // relative
                                    zIndex: 10, // z-10
                                    padding: '24px', // p-6 (בהנחה של 6 * 4px = 24px)
                                }}>
                                    <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                                        <h2 style={{
                                            fontSize: '1.5rem', // text-2xl (בהנחה של 2xl = 1.5rem)
                                            fontWeight: 'bold', // font-bold
                                            color: 'white', // text-white
                                            marginBottom: '0.5rem', // mb-2 (בהנחה של 2 * 0.25rem = 0.5rem)
                                        }}>{client.name}</h2>
                                        <p style={{
                                            color: 'rgba(255, 255, 255, 0.7)', // text-white/70
                                            marginBottom: '1rem', // mb-4 (בהנחה של 4 * 0.25rem = 1rem)
                                        }}>{client.email}</p>

                                        <Button
                                            //   asChild
                                            style={{
                                                width: '100%', // w-full
                                                background: 'linear-gradient(to right, #2563eb, #7e22ce)', // bg-gradient-to-r from-blue-600 to-purple-600
                                                color: 'white', // text-white
                                                border: 'none', // border-none
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = 'linear-gradient(to right, #1d4ed8, #5b21b6)'; // hover:from-blue-700 hover:to-purple-700
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = 'linear-gradient(to right, #2563eb, #7e22ce)'; // מחזיר את הצבע המקורי
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
                        className="col-span-full text-center text-white/80 text-xl p-8"
                    >
                        No clients available.
                    </motion.div>
                )}
            </motion.div>
        </div >
    )
}

export default AccountantHome

