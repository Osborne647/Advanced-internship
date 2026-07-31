"use client"

import { useState } from "react"
import styles from "./Reviews.module.css"
import { BsStarFill } from "react-icons/bs"
import LoginModal from "@/components/LoginModal"

export default function Reviews() {
    const [showLogin, setShowLogin] = useState(false)

    return (
        <>
            <div className={styles.row}>
                <div className={styles.container}>
                    <div className={styles["section__title"]}>What our members say</div>
                    <div className={styles["reviews__wrapper"]}>
                        <div className={styles.review}>
                            <div className={styles["review__header"]}>
                                <div className={styles["review__name"]}>Hanna M.</div>
                                <div className={styles["review__stars"]}>
                                    <BsStarFill />
                                    <BsStarFill />
                                    <BsStarFill />
                                    <BsStarFill />
                                    <BsStarFill />
                                </div>
                            </div>
                            <div className={styles["review__body"]}>
                                This app has been a <b>game-changer</b> for me! It's saved me so
                                much time and effort in reading and comprehending books. Highly
                                recommend it to all book lovers.
                            </div>
                        </div>
                        <div className={styles.review}>
                            <div className={styles["review__header"]}>
                                <div className={styles["review__name"]}>David B.</div>
                                <div className={styles["review__stars"]}>
                                    <BsStarFill />
                                    <BsStarFill />
                                    <BsStarFill />
                                    <BsStarFill />
                                    <BsStarFill />
                                </div>
                            </div>
                            <div className={styles["review__body"]}>
                                I love this app! It provides
                                <b>concise and accurate summaries</b> of books in a way that is
                                easy to understand. It's also very user-friendly and intuitive.
                            </div>
                        </div>
                        <div className={styles.review}>
                            <div className={styles["review__header"]}>
                                <div className={styles["review__name"]}>Nathan S.</div>
                                <div className={styles["review__stars"]}>
                                    <BsStarFill />
                                    <BsStarFill />
                                    <BsStarFill />
                                    <BsStarFill />
                                    <BsStarFill />
                                </div>
                            </div>
                            <div className={styles["review__body"]}>
                                This app is a great way to get the main takeaways from a book
                                without having to read the entire thing.
                                <b>The summaries are well-written and informative.</b>
                                Definitely worth downloading.
                            </div>
                        </div>
                        <div className={styles.review}>
                            <div className={styles["review__header"]}>
                                <div className={styles["review__name"]}>Ryan R.</div>
                                <div className={styles["review__stars"]}>
                                    <BsStarFill />
                                    <BsStarFill />
                                    <BsStarFill />
                                    <BsStarFill />
                                    <BsStarFill />
                                </div>
                            </div>
                            <div className={styles["review__body"]}>
                                If you're a busy person who
                                <b>loves reading but doesn't have the time</b> to read every
                                book in full, this app is for you! The summaries are thorough
                                and provide a great overview of the book's content.
                            </div>
                        </div>
                    </div>
                    <div className={styles["reviews__btn--wrapper"]}>
                        <button
                            className={`${styles.btn} ${styles["home__cta--btn"]}`}
                            onClick={() => setShowLogin(true)}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>

            <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
        </>
    )
}