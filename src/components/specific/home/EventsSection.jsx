import React from 'react'
import { EventsSecHeader } from './EventsSecHeader'
import EventSecPagination from './EventSecPagination'
import EventCard from '@/components/cards/EventCard'
import { getEvents } from '@/lib/actions/event.actions'
import { getCategories } from '@/lib/actions/category.actions'

const EventsSection = async ({ searchParams }) => {
    // const session = await auth()

    const search = searchParams?.query;
    const page = searchParams?.page || 1;
    const category = searchParams?.category

    // fetch events data form server
    const { data: events, totalPages } = await getEvents({
        page: parseInt(page),
        limit: 4,
        query: search,
        category: category
    })
    if (!events) return <p>Events not found</p>

    const { data: categories } = await getCategories();

    return (
        <section className='my-container pt-8'>
            <EventsSecHeader categories={categories} />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-10">
                {events?.length > 0 && events.map((event) => (
                    <EventCard key={event?._id} event={event} />
                ))}
            </div>
            {totalPages > 1 ?
                <EventSecPagination totalPages={totalPages} currentPage={Number(page)} />
                :
                <div>
                    <h3 className='text-lg font-semibold text-center p-6'>No Events Found</h3>
                </div>
            }
        </section>
    )
}

export default EventsSection