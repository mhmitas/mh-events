"use client"

import React, { useEffect, useTransition } from 'react'
import { Button } from '../ui/button'
import { loadStripe } from '@stripe/stripe-js';
import { checkoutOrder } from '@/lib/actions/order.actions';

// Make sure to call `loadStripe` outside of a component’s render to avoid recreating the `Stripe` object on every render.
loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Checkout = ({ session, event }) => {
    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
            console.log('Order placed! You will receive an email confirmation.');
        }

        if (query.get('canceled')) {
            console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
        }
    }, []);

    async function onCheckout() {
        const order = {
            eventTitle: event?.title,
            price: event?.price,
            isFree: event?.isFree,
            userId: session?.user?.id,
            eventImage: event?.thumbnailUrl,
            eventId: event?._id,
        }
        startTransition(async () => {
            await checkoutOrder({ order })
        });
    }

    return (
        <form action={onCheckout} method='post'>
            <Button variant="secondary" className="rounded-full">
                {isPending ?
                    "Processing..." :
                    event.isFree ?
                        "Get Ticket" :
                        "Buy Ticket"
                }
            </Button>
        </form>
    )
}

export default Checkout