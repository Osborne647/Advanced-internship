import Stripe from "stripe"
import { adminDb } from "@/firebase/admin"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(req) {
    const body = await req.text()
    const sig = req.headers.get("stripe-signature")

    let event

    try {
        event = stripe.webhooks.constructEvent(
            body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        )
    } catch (err) {
        console.error("Webhook signature failed:", err.message)
        return new Response("Invalid signature", { status: 400 })
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object
        const uid = session.metadata.uid

        await adminDb.collection("users").doc(uid).set(
            {
                subscribed: true,
                subscriptionId: session.subscription,
                plan: session.amount_total === 9999 ? "yearly" : "monthly",
                subscribedAt: new Date().toISOString(),
            },
            { merge: true }
        )
    }

    if (event.type === "customer.subscription.deleted") {
        const subscription = event.data.object
        const snapshot = await adminDb
            .collection("users")
            .where("subscriptionId", "==", subscription.id)
            .get()

        if (!snapshot.empty) {
            const userDoc = snapshot.docs[0]
            await userDoc.ref.update({
                subscribed: false,
                plan: null,
            })
        }
    }

    return new Response("OK", { status: 200 })
}