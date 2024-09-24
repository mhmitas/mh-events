import React from 'react'
import { EventsSecHeader } from './EventsSecHeader'
import EventSecPagination from './EventSecPagination'
import EventCard from '@/components/cards/EventCard'
import { getEvents } from '@/lib/actions/event.actions'
import { auth } from '@/auth'

const EventsSection = async () => {
    const session = await auth()
    const { data: events } = await getEvents()
    if (!events) return <p>Events not found</p>

    return (
        <section className='my-container pt-8'>
            <EventsSecHeader />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-10">
                {events?.length > 0 && events.map((event) => (
                    <EventCard key={event?._id} event={event} />
                ))}
            </div>
            <EventSecPagination />
        </section>
    )
}

export default EventsSection