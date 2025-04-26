

"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Cloud } from "@mui/icons-material"
import { Card, CardContent } from "@mui/material"
import { card, cardContent, div2, div3, div4, motionDiv, motionDiv1, motionDiv2, motionDiv3, motionH1, motionH2, styleDiv, styleDiv1 } from "./HomePageDesign"

const HomePage = () => {
    const [mounted, setMounted] = useState(false)
    const Sparkles = () => {
        return <div style={{ position: 'absolute', color: '#FBBF24', width: '100%', height: '100%' }}>✨</div>;
    };

    useEffect(() => {
        setMounted(true)

        const createParticle = () => {
            const particle = document.createElement("div")
            const size = Math.random() * 10 + 5
            particle.className = `absolute rounded-full bg-primary/30 pointer-events-none`
            particle.style.width = `${size}px`
            particle.style.height = `${size}px`
            particle.style.left = `${Math.random() * 100}%`
            particle.style.top = `${Math.random() * 100}%`
            particle.style.opacity = "0"
            particle.style.transform = "scale(0)"
            particle.style.animation = `float ${Math.random() * 5 + 3}s ease-in-out infinite, 
                                  fade ${Math.random() * 3 + 2}s ease-in-out infinite`

            document.getElementById("particle-container")?.appendChild(particle)

            setTimeout(() => {
                particle.remove()
            }, 8000)
        }

        const interval = setInterval(() => {
            if (document.getElementById("particle-container")) {
                createParticle()
            }
        }, 300)

        return () => clearInterval(interval)
    }, [])

    if (!mounted) return null

    return (
        <div style={styleDiv}>
            <div id="particle-container" style={styleDiv1} />
            <motion.div
                style={motionDiv}
                animate={{ y: [0, 15, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
                <Cloud />
            </motion.div>

            <motion.div
                style={motionDiv1} animate={{ y: [0, -20, 0], rotate: [0, -5, 0] }}
                transition={{
                    duration: 10,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
            >
                <Cloud />
            </motion.div>

            <div style={div2}>
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={motionDiv2}                >
                    <Card style={card}>
                        <div style={div3} />

                        <CardContent style={cardContent}>
                            <motion.div
                                style={{ position: "absolute" }}
                                animate={{
                                    rotate: [0, 360],
                                }}
                                transition={{
                                    duration: 20,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "linear",
                                }}
                            >
                                <div style={div4}>
                                    <Sparkles />
                                </div>
                            </motion.div>

                            <motion.div
                                style={motionDiv3} whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0 0 30px rgba(79, 70, 229, 0.6)",
                                }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                            </motion.div>

                            <motion.h1
                                style={motionH1} initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                            >
                                Welcome to Invoicify
                            </motion.h1>

                            <motion.h2
                                style={motionH2} initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                            >
                                Easily decode and store your invoices in the cloud.
                            </motion.h2>

                            <motion.div
                                style={{marginTop: '3rem'}}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                            >

                            </motion.div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    )
}

export default HomePage

