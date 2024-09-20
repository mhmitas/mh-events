import React from 'react'
import { EventsSecHeader } from './EventsSecHeader'
import Image from 'next/image'
import EventSecPagination from './EventSecPagination'
import Link from 'next/link'

const EventsSection = () => {
    return (
        <section className='my-container pt-8'>
            <EventsSecHeader />
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 pt-10">
                {[...Array(12).keys()].map((i) => (
                    <div key={i} className="group relative rounded-lg overflow-hidden shadow hover:shadow-md border bg-background max-w-md mx-auto">
                        <Link href="#">
                            <figure className='aspect-video bg-muted overflow-hidden'>
                                <Image
                                    src={`https://i.ibb.co.com/1m4KhSn/html-css-collage-concept-with-person-23-2150062004.jpg`}
                                    alt="Blog post thumbnail"
                                    width={500}
                                    height={400}
                                    className="object-cover w-full transition-transform group-hover:scale-[1.03] duration-500"
                                />
                            </figure>
                            <div className="p-4 space-y-2">
                                <div className='flex flex-wrap gap-2'>
                                    <span className="inline-flex items-center px-3 py-1 text-sm font-semibold leading-5 text-foreground/90 bg-green-600/15 text-green-600 rounded-full">
                                        FREE
                                    </span>
                                    <span className="inline-flex items-center px-3 py-1 text-sm font-semibold leading-5 text-foreground/90 bg-muted rounded-full">
                                        Development
                                    </span>
                                </div>
                                <h3 className='font-medium text-foreground/80'>Fri, 12 Oct 2024, 8:30 PM</h3>
                                <h3 className="text-lg font-medium leading-6 line-clamp-2">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione iste repellendus unde deleniti ad ab fugiat mollitia. Excepturi, quo aperiam! {i}</h3>
                                <h1 className='font-semibold text-foreground/80'>Mh Mitas</h1>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            <EventSecPagination />
        </section>
    )
}

export default EventsSection