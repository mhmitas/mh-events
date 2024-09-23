import { Calendar, CalendarClockIcon, Clock } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const EventCard = ({ event }) => {
    const { _id, title, startDateTime, price, isFree, thumbnailUrl, organizer, category } = event;

    const formattedStartDateTime = moment(new Date(startDateTime)).format('D MMM YYYY, h:mm a');

    return (
        <Link href={`/events/${_id}/details`}>
            <div className="group relative rounded-lg overflow-hidden shadow hover:shadow-md border bg-background max-w-md mx-auto size-full flex flex-col">
                <figure className='aspect-video bg-gray-500 overflow-hidden flex items-center justify-center'>
                    <Image
                        src={thumbnailUrl}
                        alt={title}
                        width={500}
                        height={281.25}
                        className="object-cover w-full transition-transform group-hover:scale-[1.03] duration-500"
                    />
                </figure>
                <div className="p-4 space-y-3 flex-1">
                    <div className='flex flex-wrap gap-2'>
                        <span className="event-card-badge bg-green-100 text-green-600 rounded-full">
                            {isFree ? "FREE" : "$" + price}
                        </span>
                        <span className="event-card-badge bg-muted rounded-full">
                            {category?.name}
                        </span>
                    </div>
                    <h3 className='font-medium text-foreground/80 text flex gap-1 items-center'><CalendarClockIcon className='size-4 text-rose-500' />{formattedStartDateTime}</h3>
                    <h3 className="text-lg font-medium leading-6 line-clamp-2">{title}</h3>
                </div>
                <h1 className='font-semibold text-foreground/80 line-clamp-1 p-4 pt-0'>{organizer?.name}</h1>
            </div>
        </Link>
    )
}

export default EventCard