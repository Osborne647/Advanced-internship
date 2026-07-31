"use client"

import { useAuth } from "@/hooks/useAuth"
import Sidebar from "@/components/Sidebar"
import styles from "./page.module.css"

export default function SettingsPage() {
    const { user } = useAuth()

    return (
        <div className={styles.pageContainer}>
            <Sidebar />
            <main className={styles.main}>
                <h1 className={styles.heading}>Settings</h1>

                {!user ? (
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
                                {user.isAnonymous ? "No subscription (Guest)" : "Premium"}
                            </span>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}