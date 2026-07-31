"use client"

import { useState } from "react"
import styles from "./Landing.module.css"
import Image from "next/image"
import landing from "@/assets/landing.png"
import LoginModal from "@/components/LoginModal"
import { useAuth } from "@/hooks/useAuth"

export default function Landing() {
    const [showLogin, setShowLogin] = useState(false)
    const { user, logout } = useAuth()

    return (
        <>
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.landing__wrapper}>
                        <div className={styles["landing__content"]}>
                            <div className={styles["landing__content__title"]}>
                                Gain more knowledge <br className={styles["remove--tablet"]} />
                                in less time
                            </div>
                            <div className={styles["landing__content__subtitle"]}>
                                Great summaries for busy people,
                                <br className={styles["remove--tablet"]} />
                                individuals who barely have time to read,
                                <br className={styles["remove--tablet"]} />
                                and even people who don't like to read.
                            </div>
                            <button
                                className={`${styles.btn} ${styles["home__cta--btn"]}`}
                                onClick={user ? logout : () => setShowLogin(true)}
                            >
                                {user ? "Logout" : "Login"}
                            </button>
                        </div>
                        <figure className={styles["landing__image--mask"]}>
                            <Image src={landing} alt="landing" />
                        </figure>
                    </div>
                </div>
            </div>
            <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
        </>
    )
}