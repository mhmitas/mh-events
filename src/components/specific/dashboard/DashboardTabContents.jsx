import EventCard from '@/components/cards/EventCard'
import { getEventsByUser } from '@/lib/actions/event.actions'
import React from 'react'

export const MyEvents = async ({ session }) => {
    const { data: events } = await getEventsByUser({ userId: session?.user?.id })

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {events?.length > 0 && events.map((event) => (
                <EventCard key={event?._id} event={event} />
            ))}
        </div>
    )
}
export const MyTickets = async ({ session }) => {
    return (
        <div>

        </div>
    )
}
