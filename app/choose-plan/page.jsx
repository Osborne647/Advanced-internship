"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import Sidebar from "@/components/Sidebar"
import styles from "./page.module.css"

export default function ChoosePlanPage() {
    const { user } = useAuth()
    const [selected, setSelected] = useState("yearly")
    const [loading, setLoading] = useState(false)

    const handleCheckout = async () => {
        if (!user) return alert("Please log in first.")
        setLoading(true)

        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    plan: selected,
                    uid: user.uid,
                    email: user.email,
                }),
            })
            const { url } = await res.json()
            window.location.href = url
        } catch (err) {
            console.error(err)
            alert("Something went wrong. Try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.pageContainer}>
            <Sidebar />
            <main className={styles.main}>
                <h1 className={styles.heading}>Choose Your Plan</h1>
                <p className={styles.subheading}>Unlock unlimited access to all book summaries</p>

                <div className={styles.plans}>
                    <div
                        className={`${styles.planCard} ${selected === "monthly" ? styles.active : ""}`}
                        onClick={() => setSelected("monthly")}
                    >
                        <h3 className={styles.planName}>Monthly</h3>
                        <p className={styles.price}>$9.99<span className={styles.period}>/month</span></p>
                        <p className={styles.detail}>Billed monthly, cancel anytime</p>
                    </div>

                    <div
                        className={`${styles.planCard} ${selected === "yearly" ? styles.active : ""}`}
                        onClick={() => setSelected("yearly")}
                    >
                        <span className={styles.badge}>Save 17%</span>
                        <h3 className={styles.planName}>Yearly</h3>
                        <p className={styles.price}>$99.99<span className={styles.period}>/year</span></p>
                        <p className={styles.detail}>7-day free trial, then $8.33/month billed annually</p>
                    </div>
                </div>

                <button
                    className={styles.checkoutBtn}
                    onClick={handleCheckout}
                    disabled={loading}
                >
                    {loading ? "Redirecting..." : "Continue to Checkout"}
                </button>
            </main>
        </div>
    )
}