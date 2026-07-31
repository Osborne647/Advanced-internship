import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const PRICE_IDS = {
    monthly: process.env.STRIPE_MONTHLY_PRICE_ID,
    yearly: process.env.STRIPE_YEARLY_PRICE_ID,
}

export async function POST(req) {
    try {
        const { plan, uid, email } = await req.json()

        const sessionConfig = {
            mode: "subscription",
            payment_method_types: ["card"],
            customer_email: email,
            metadata: { uid },
            line_items: [
                {
                    price: PRICE_IDS[plan],
                    quantity: 1,
                },
            ],
            success_url: `${process.env.NEXT_PUBLIC_URL}/settings?success=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_URL}/choose-plan`,
        }

        if (plan === "yearly") {
            sessionConfig.subscription_data = {
                trial_period_days: 7,
            }
        }

        const session = await stripe.checkout.sessions.create(sessionConfig)
        return Response.json({ url: session.url })
    } catch (err) {
        console.error("Checkout error:", err)
        return Response.json({ error: err.message }, { status: 500 })
    }
}