import styles from "./Skeleton.module.css"

export default function Skeleton({ width, height, borderRadius, count = 1 }) {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className={styles.skeleton}
                    style={{
                        width: width || "100%",
                        height: height || "1rem",
                        borderRadius: borderRadius || "4px",
                    }}
                />
            ))}
        </>
    )
}