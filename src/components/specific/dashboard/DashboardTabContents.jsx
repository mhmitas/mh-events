import EventCard from '@/components/cards/EventCard'
import TicketCard from '@/components/cards/TicketCard'
import { Button } from '@/components/ui/button'
import { getEventsByUser, getTicketsOfUser } from '@/lib/actions/event.actions'
import Link from 'next/link'
import React from 'react'

export const MyEvents = async ({ session }) => {
    const { data: events } = await getEventsByUser({ userId: session?.user?.id })

    return (
        <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {events?.length > 0 && events.map((event) => (
                    <EventCard key={event?._id} event={event} ordersLink={true} />
                ))}
            </div>
            {events.length === 0 && <div className='text-center p-4 space-y-2 h-full my-6 w-full flex items-center justify-center flex-col'>
                <p className='font-medium text-xl'>No events organized</p>
                <p>Don't worry, you can easily create an event and manage it in out platform</p>
                <Button><Link href="/events/create">Create Event</Link></Button>
            </div>}
        </>
    )
}
export const MyTickets = async ({ session }) => {
    const { data: tickets } = await getTicketsOfUser({ userId: session?.user?.id });

    return (
        <section className='flex flex-wrap items-center justify-center gap-4'>
            {tickets?.length > 0 ?
                (
                    tickets.map((ticket) => (
                        <TicketCard session={session} key={ticket?._id} ticket={ticket} />
                    ))
                ) :
                (
                    <div className='text-center p-4 space-y-2 h-full my-6'>
                        <p className='font-medium text-xl'>No tickets booked yet</p>
                        <p>Don't worry, you will find lots of incredible events in out platform</p>
                        <Button><Link href="/#event_section">Explore events and book ticket</Link></Button>
                    </div>
                )
            }
        </section>
    )
}