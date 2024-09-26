"use server"

import { redirect } from "next/navigation";
import Stripe from "stripe";
import { connectDB } from "../database/mongoose";
import { Order } from "../database/models/order.model";
import mongoose from "mongoose";

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
            event: order?.eventId,
            buyer: order?.buyerId,
        })
        return { success: true, data: JSON.parse(JSON.stringify(newOrder)) }
        // TODO: send order confirmation email
    } catch (error) {
        throw error;
    }
}

export async function hasUserBookedTicket({ eventId, userId }) {
    try {
        await connectDB()

        const isBought = await Order.exists({
            event: eventId,
            buyer: userId,
        })
        return !!isBought;
    } catch (error) {
        throw error;
    }
}

export async function getOrdersByEvent({ eventId }) {
    try {
        await connectDB()

        const orders = await Order.aggregate([
            [
                {
                    $match: {
                        event: new mongoose.Types.ObjectId(`${eventId}`),
                    },
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "buyer",
                        foreignField: "_id",
                        as: "buyer",
                    },
                },
                {
                    $unwind: "$buyer",
                },
                {
                    $lookup: {
                        from: "events",
                        localField: "event",
                        foreignField: "_id",
                        as: "event",
                    },
                },
                {
                    $unwind: "$event",
                },
                {
                    $project: {
                        eventId: "$event._id",
                        eventTitle: "$event.title",
                        totalAmount: 1,
                        createdAt: 1,
                        stripeId: 1,
                        buyer: {
                            id: "$buyer._id",
                            email: "$buyer.email",
                            name: "$buyer.name",
                        },
                    },
                },
            ]
        ])

        return { success: true, data: JSON.parse(JSON.stringify(orders)) };
    } catch (error) {
        throw error;
    }
}