import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

import Checkout from "./Checkout";
import { ExternalLink } from "lucide-react";
import { hasUserBookedTicket } from "@/lib/actions/order.actions";

const CheckoutButton = async ({ event, session }) => {
    const isBooked = await hasUserBookedTicket({
        userId: session?.user?.id,
        eventId: event?._id,
    });

    const hasEventFinished = new Date(event.endDateTime) < new Date();

    return (
        <>
            {" "}
            {hasEventFinished ? (
                <p className="text-destructive">
                    Sorry, tickets are no longer available
                </p>
            ) : session ? (
                isBooked ? (
                    <Link href="#" className="text-secondary flex gap-1 items-center hover:underline"><span>View Ticket</span> <ExternalLink className="size-4" /></Link>
                ) : (
                    <Checkout session={session} event={event} />
                )
            ) : (
                <Button variant="secondary" className="rounded-full" asChild>
                    <Link href="/sign-in">
                        {event.isFree ? "Get Ticket" : "Buy Ticket"}
                    </Link>
                </Button>
            )}
        </>
    );
};

export default CheckoutButton;