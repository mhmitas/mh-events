import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const EventCard = ({ event }) => {
    const { title, startDateTime, endDateTime, thumbnailUrl } = event;

    return (
        <div className="group relative rounded-lg overflow-hidden shadow hover:shadow-md border bg-background max-w-md mx-auto w-full">
            <Link href="#">
                <figure className='aspect-video bg-muted overflow-hidden'>
                    <Image
                        src={thumbnailUrl}
                        alt={title}
                        width={500}
                        height={281.25}
                        className="object-cover w-full transition-transform group-hover:scale-[1.03] duration-500"
                    />
                </figure>
                <div className="p-4 space-y-2">
                    <div className='flex flex-wrap gap-2'>
                        <span className="event-card-badge bg-green-600/15 text-green-600 rounded-full">
                            FREE
                        </span>
                        <span className="event-card-badge text-foreground/90 bg-muted rounded-full">
                            Development
                        </span>
                    </div>
                    <h3 className='font-medium text-foreground/80'>Fri, 12 Oct 2024, 8:30 PM</h3>
                    <h3 className="text-lg font-medium leading-6 line-clamp-2">{title}</h3>
                    <h1 className='font-semibold text-foreground/80'>Mh Mitas</h1>
                </div>
            </Link>
        </div>
    )
}

export default EventCard