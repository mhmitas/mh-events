import { auth } from '@/auth'
import EventForm from '@/components/forms/event-form/EventForm'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {

    const session = await auth();
    // console.log({ sessionFromCreateEventPage: session });
    if (!session || !session?.user) {
        return redirect('/sign-in')
    }

    return (
        <main className='bg-muted dark:bg-background/50 pb-16 pt-8'><section className='my-container'>
            <h1 className='title-1 mb-6 text-center'>Create Event</h1>
            <EventForm formType="Create" userId={session?.user?.id} />
        </section></main>
    )
}

export default page