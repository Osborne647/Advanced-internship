"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/Sidebar"
import Skeleton from "@/components/Skeleton"
import styles from "./page.module.css"

export default function SettingsPage() {
    const { user } = useAuth()
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500)
        return () => clearTimeout(timer)
    }, [])

    const isSubscribed = user && user.subscribed

    return (
        <div className={styles.pageContainer}>
            <Sidebar />
            <main className={styles.main}>
                <h1 className={styles.heading}>Settings</h1>

                {loading ? (
                    <div className={styles.card}>
                        <div className={styles.row}>
                            <Skeleton width="60px" height="1rem" />
                            <Skeleton width="200px" height="1rem" />
                        </div>
                        <div className={styles.row}>
                            <Skeleton width="100px" height="1rem" />
                            <Skeleton width="150px" height="1rem" />
                        </div>
                    </div>
                ) : !user ? (
                    <p className={styles.message}>Please log in to view settings.</p>
                ) : (
                    <div className={styles.card}>
                        <div className={styles.row}>
                            <span className={styles.label}>Email</span>
                            <span className={styles.value}>{user.email || "Guest user"}</span>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.label}>Subscription</span>
                            <span className={styles.value}>
                                {isSubscribed ? "Premium" : "Basic"}
                            </span>
                            {!isSubscribed && (
                                <button
                                    className={styles.upgradeBtn}
                                    onClick={() => router.push("/choose-plan")}
                                >
                                    Upgrade
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}