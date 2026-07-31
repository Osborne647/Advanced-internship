import styles from "./Features.module.css"
import Image from "next/image"
import { AiFillAudio, AiFillFileText, AiFillBulb } from "react-icons/ai"

export default function Landing() {
    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <div className={styles["section__title"]}>Understand books in few minutes</div>
                <div className={styles["features__wrapper"]}>
                    <div className={styles.features}>
                        <div className={styles["features__icon"]}>
                            <AiFillFileText />
                        </div>
                        <div className={styles["features__title"]}>Read or listen</div>
                        <div className={styles["features__sub--title"]}>
                            Save time by getting the core ideas from the best books.
                        </div>
                    </div>
                    <div className={styles.features}>
                        <div className={styles["features__icon"]}>
                            <AiFillBulb />
                        </div>
                        <div className={styles["features__title"]}>Find your next read</div>
                        <div className={styles["features__sub--title"]}>
                            Explore book lists and personalized recommendations.
                        </div>
                    </div>
                    <div className={styles.features}>
                        <div className={styles["features__icon"]}>
                            <AiFillAudio />
                        </div>
                        <div className={styles["features__title"]}>Briefcasts</div>
                        <div className={styles["features__sub--title"]}>
                            Gain valuable insights from briefcasts
                        </div>
                    </div>
                </div>
                <div className={styles["statistics__wrapper"]}>
                    <div className={styles["statistics__content--header"]}>
                        <div className={styles["statistics__heading"]}>Enhance your knowledge</div>
                        <div className={styles["statistics__heading"]}>Achieve greater success</div>
                        <div className={styles["statistics__heading"]}>Improve your health</div>
                        <div className={styles["statistics__heading"]}>
                            Develop better parenting skills
                        </div>
                        <div className={styles["statistics__heading"]}>Increase happiness</div>
                        <div className={styles["statistics__heading"]}>
                            Be the best version of yourself!
                        </div>
                    </div>
                    <div className={styles["statistics__content--details"]}>
                        <div className={styles["statistics__data"]}>
                            <div className={styles["statistics__data--number"]}>93%</div>
                            <div className={styles["statistics__data--title"]}>
                                of Summarist members <span className={styles.bold}>significantly increase</span> reading
                                frequency.
                            </div>
                        </div>
                        <div className={styles["statistics__data"]}>
                            <div className={styles["statistics__data--number"]}>96%</div>
                            <div className={styles["statistics__data--title"]}>
                                of Summarist members <span className={styles.bold}>establish better</span> habits.
                            </div>
                        </div>
                        <div className={styles["statistics__data"]}>
                            <div className={styles["statistics__data--number"]}>90%</div>
                            <div className={styles["statistics__data--title"]}>
                                have made <span className={styles.bold}>significant positive</span> change to their lives.
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles["statistics__wrapper"]}>
                    <div
                        className={`${styles["statistics__content--details"]} ${styles["statistics__content--details-second"]}`}
                    >
                        <div className={styles["statistics__data"]}>
                            <div className={styles["statistics__data--number"]}>91%</div>
                            <div className={styles["statistics__data--title"]}>
                                of Summarist members <span className={styles.bold}>report feeling more productive</span> after incorporating the service into their daily routine.
                            </div>
                        </div>
                        <div className={styles["statistics__data"]}>
                            <div className={styles["statistics__data--number"]}>94%</div>
                            <div className={styles["statistics__data--title"]}>
                                of Summarist members have <span className={styles.bold}>noticed an improvement</span> in
                                their overall comprehension and retention of information.
                            </div>
                        </div>
                        <div className={styles["statistics__data"]}>
                            <div className={styles["statistics__data--number"]}>88%</div>
                            <div className={styles["statistics__data--title"]}>
                                of Summarist members <span className={styles.bold}>feel more informed</span> about current
                                events and industry trends since using the platform.
                            </div>
                        </div>
                    </div>
                    <div
                        className={`${styles["statistics__content--header"]} ${styles["statistics__content--header-second"]}`}
                    >
                        <div className={styles["statistics__heading"]}>Expand your learning</div>
                        <div className={styles["statistics__heading"]}>Accomplish your goals</div>
                        <div className={styles["statistics__heading"]}>Strengthen your vitality</div>
                        <div className={styles["statistics__heading"]}>Become a better caregiver</div>
                        <div className={styles["statistics__heading"]}>Improve your mood</div>
                        <div className={styles["statistics__heading"]}>Maximize your abilities</div>
                    </div>
                </div>
            </div>
        </div>
    )
}