import AboutSection from '@/components/specific/home/About'
import EventsSection from '@/components/specific/home/EventsSection'
import Hero from '@/components/specific/home/Hero'
import React from 'react'

const page = ({ searchParams }) => {

    return (
        <main>
            <Hero />
            <EventsSection page={searchParams?.page || 1} />
            <AboutSection />
        </main>
    )
}

export default page