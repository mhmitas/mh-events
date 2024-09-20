import AboutSection from '@/components/specific/home/About'
import EventsSection from '@/components/specific/home/EventsSection'
import Hero from '@/components/specific/home/Hero'
import React from 'react'

const page = () => {
    return (
        <main>
            <Hero />
            <EventsSection />
            <AboutSection />
        </main>
    )
}

export default page