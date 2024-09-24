import { auth } from '@/auth';
import EventForm from '@/components/forms/event-form/EventForm';
import { getEventById } from '@/lib/actions/event.actions';
import { notFound } from 'next/navigation';
import React from 'react'

const UpdateEvent = async ({ params: { id } }) => {
    // fetch session data
    const session = await auth();

    // fetch event data 
    const { data: event } = await getEventById({ eventId: id });

    // make secure
    if (event?.organizer?._id !== session?.user?.id) {
        return notFound()
    }

    return (
        <main className='bg-muted dark:bg-background/50 pb-16 pt-8'><section className='my-container'>
            <h1 className='title-1 mb-6 text-center'>Update Event</h1>
            <EventForm formType="Update" userId={session?.user?.id} event={event} eventId={event?._id} />
        </section></main>
    )
}

export default UpdateEvent