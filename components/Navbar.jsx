"use client"

import { useState } from "react"
import styles from "./Navbar.module.css"
import logo from "@/assets/logo.png"
import Image from "next/image"
import LoginModal from "@/components/LoginModal"
import { useAuth } from "@/hooks/useAuth"

export default function Navbar() {
    const [showLogin, setShowLogin] = useState(false)
    const { user, logout } = useAuth()

    return (
        <>
            <div className={styles.row}>
                <div className={styles.container}>
                    <div className={styles.nav__wrapper}>
                        <figure className={styles["nav__img--mask"]}>
                            <Image className={styles.nav__img} src={logo} alt="logo" />
                        </figure>
                        <ul className={styles["nav__list--wrapper"]}>
                            <li className={`${styles.nav__list} ${styles["nav__list--login"]}`}>
                                <button
                                    style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", font: "inherit" }}
                                    onClick={user ? logout : () => setShowLogin(true)}
                                >
                                    {user ? "Logout" : "Login"}
                                </button>
                            </li>
                            <li className={`${styles.nav__list} ${styles["nav__list--mobile"]}`}>About</li>
                            <li className={`${styles.nav__list} ${styles["nav__list--mobile"]}`}>Contact</li>
                            <li className={`${styles.nav__list} ${styles["nav__list--mobile"]}`}>Help</li>
                        </ul>
                    </div>
                </div>
            </div>

            <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
        </>
    )
}