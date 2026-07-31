"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import styles from "./LoginModal.module.css"

export default function LoginModal({ isOpen, onClose }) {
    const router = useRouter()
    const { loginWithGoogle, loginAsGuest, loginWithEmail, signUpWithEmail } = useAuth()
    const [isSignUp, setIsSignUp] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    if (!isOpen) return null

    const goToForYou = () => {
        onClose()
        router.push("/for-you")
    }

const handleEmailSubmit = async (e) => {
    e.preventDefault()
    setError("")
    try {
        const user = isSignUp
            ? await signUpWithEmail(email, password)
            : await loginWithEmail(email, password)
        if (user) goToForYou()
    } catch (err) {
        setError(err.message)
    }
}


    const handleGoogleLogin = async () => {
        const user = await loginWithGoogle()
        if (user) goToForYou()
    }

    const handleGuestLogin = async () => {
        const user = await loginAsGuest()
        if (user) goToForYou()
    }

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={onClose}>×</button>
                <h2>{isSignUp ? "Create an account" : "Log in"}</h2>

                <button className={styles.googleBtn} onClick={handleGoogleLogin}>
                    Continue with Google
                </button>

                <button className={styles.guestBtn} onClick={handleGuestLogin}>
                    Continue as Guest
                </button>

                <div className={styles.divider}>or</div>

                <form onSubmit={handleEmailSubmit} className={styles.emailForm}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && <p className={styles.error}>{error}</p>}
                    <button type="submit">{isSignUp ? "Sign up" : "Log in"}</button>
                </form>

                <p className={styles.toggleText}>
                    {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                    <button
                        type="button"
                        className={styles.toggleBtn}
                        onClick={() => {
                            setIsSignUp(!isSignUp)
                            setError("")
                        }}
                    >
                        {isSignUp ? "Log in" : "Sign up"}
                    </button>
                </p>
            </div>
        </div>
    )
}