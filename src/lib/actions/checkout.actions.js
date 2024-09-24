"use server"

import { redirect } from "next/navigation";
import Stripe from "stripe";
import { connectDB } from "../database/mongoose";
import { Order } from "../database/models/order.model";

export async function checkoutOrder({ order }) {
    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

        const price = order?.isFree ? 0 : Number(order?.price) * 100;

        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        unit_amount: price,
                        product_data: {
                            name: order?.eventTitle,
                            images: [order?.eventImage]
                        },
                    },
                    quantity: 1
                }
            ],
            metadata: {
                eventId: order?.eventId,
                buyerId: order?.userId
            },
            mode: 'payment',
            success_url: `${process.env.APP_URL}/dashboard?tab=my_tickets&success=true`,
            cancel_url: `${process.env.APP_URL}/?canceled=true`,
        });
        redirect(session.url);
    } catch (error) {
        throw error;
    }
}

export async function createOrder({ order }) {
    try {
        await connectDB()

        const newOrder = await Order.create({
            ...order,
            event: order.eventId,
            buyer: order.buyerId,
        })

        return { success: true, data: JSON.parse(JSON.stringify(newOrder)) }
        // TODO: send order confirmation email
    } catch (error) {
        throw error;
    }
}