

"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Cloud } from "@mui/icons-material"
import { Card, CardContent } from "@mui/material"

const HomePage = () => {
    const [mounted, setMounted] = useState(false)
    const Sparkles = () => {
        return <div style={{ position: 'absolute', color: '#FBBF24', width: '100%', height: '100%' }}>✨</div>;
    };

    useEffect(() => {
        setMounted(true)

        // Create particles effect
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
        <div style={{
            position: 'relative',
            width :"100%",
            overflow: 'hidden',
        }}>
            <div id="particle-container" style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                zIndex: 0,

                
            }} />

            {/* Animated floating clouds */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: '20px',
                    left: '10px',
                    opacity: 0.3,
                    color: 'white',

                }} animate={{
                    y: [0, 15, 0],
                    rotate: [0, 5, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
            >
                <Cloud />
            </motion.div>

            <motion.div
                style={{
                    position: 'absolute', // absolute
                    bottom: '5rem', // bottom-20 (20 * 0.25rem = 5rem)
                    right: '2.5rem', // right-10 (10 * 0.25rem = 2.5rem)
                    opacity: 0.2, // opacity-20
                    color: 'white', // text-white
                }} animate={{
                    y: [0, -20, 0],
                    rotate: [0, -5, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
            >
                <Cloud /*size={100}*/ />
            </motion.div>

            {/* Main content */}
            <div style={{
                position: 'relative',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                padding: '1rem', 
            }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{
                        width: '100%', // w-full
                        maxWidth: '64rem', // max-w-4xl (4xl = 64rem)
                    }}                >
                    <Card style={{
                        backdropFilter: 'blur(20px)', // תוכל לשנות את הערך לפי הצורך
                        backgroundColor: 'rgba(255, 255, 255, 0.1)', // שקיפות של 10%
                        border: 'none',
                        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.25)', // תוכל לשנות את הערכים לפי הצורך
                        overflow: 'hidden',
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0,
                            background: 'linear-gradient(to right, rgba(37, 99, 235, 0.2), rgba(128, 0, 128, 0.2))', // צבעים עבור blue-500 ו-purple-500 עם שקיפות של 20%
                            zIndex: 0,
                        }} />

                        <CardContent style={{
                            position: 'relative',
                            zIndex: 10,

                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingTop: '4rem', // 16px
                            paddingBottom: '4rem', // 16px
                            paddingLeft: '1.5rem', // 6px
                            paddingRight: '1.5rem', // 6px
                        }}>
                            {/* Sparkle effect around logo */}
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
                                <div style={{
                                    position: 'relative',
                                    width: '8rem', // 32px
                                    height: '8rem', // 32px
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Sparkles />
                                </div>
                            </motion.div>

                            <motion.div
                                style={{
                                    backgroundImage: 'linear-gradient(to right, #2563eb, #6d28d9)', // bg-gradient-to-r from-blue-600 to-purple-600
                                    padding: '1.5rem', // p-6
                                    borderRadius: '9999px', // rounded-full
                                    marginBottom: '2rem', // mb-8
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', // shadow-lg
                                }} whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0 0 30px rgba(79, 70, 229, 0.6)",
                                }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                {/* <CloudLightning className="w-12 h-12 text-white" /> */}
                            </motion.div>

                            <motion.h1
                                style={{
                                    fontSize: '2.25rem', // text-4xl
                                    fontWeight: 'bold', // font-bold
                                    textAlign: 'center', // text-center
                                    marginBottom: '1.5rem', // mb-6
                                    backgroundImage: 'linear-gradient(to right, #3b82f6, #d946ef, #ec4899)', // bg-gradient-to-r from-blue-400 via-purple-300 to-pink-400
                                    WebkitBackgroundClip: 'text', // bg-clip-text
                                    color: 'transparent', // text-transparent
                                }} initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                            >
                                Welcome to Invoicify
                            </motion.h1>

                            <motion.h2
                                style={{
                                    fontSize: '1.25rem', // text-xl
                                    textAlign: 'center', // text-center
                                    color: 'rgba(255, 255, 255, 0.8)', // text-white/80
                                    maxWidth: '32rem', // max-w-2xl
                                }} initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                            >
                                Easily decode and store your invoices in the cloud.
                            </motion.h2>

                            <motion.div
                                style={{
                                    marginTop: '3rem', // mt-12
                                }} 
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                            >
                               
                            </motion.div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* CSS for particle animations */}
            <style >{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.1); }
        }
        
        @keyframes fade {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.7; }
        }
      `}</style>
        </div>
    )
}

export default HomePage

