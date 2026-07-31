"use client";

import styles from "./SubscriptionPill.module.css";

export default function SubscriptionPill({ subscriptionRequired }) {
  return (
    <span className={`${styles.pill} ${subscriptionRequired ? styles.premium : styles.free}`}>
      {subscriptionRequired ? "Premium" : "Free"}
    </span>
  );
}