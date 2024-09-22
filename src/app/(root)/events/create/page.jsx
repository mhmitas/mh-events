import EventForm from '@/components/forms/event-form/EventForm'
import React from 'react'

const page = () => {

    return (
        <main className='bg-muted dark:bg-background/50 pb-16 pt-8'><section className='my-container'>
            <h1 className='title-1 mb-6'>Create Event</h1>
            <EventForm formType="create" />
        </section></main>
    )
}

export default page