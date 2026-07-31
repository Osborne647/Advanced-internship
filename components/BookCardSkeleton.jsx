import Skeleton from "./Skeleton"
import styles from "./BookCard.module.css"

export default function BookCardSkeleton() {
    return (
        <div className={styles.card}>
            <Skeleton width="140px" height="210px" borderRadius="4px" />
            <Skeleton width="80%" height="1rem" />
            <Skeleton width="50%" height="0.75rem" />
        </div>
    )
}