import { CalendarClockIcon, Edit, ExternalLink } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button';
import EventDeleteConfirmation from '../modals/EventDeleteConfirmation';
import { auth } from '@/auth';

const EventCard = async ({ event, ordersLink }) => {
    const session = await auth()

    const { _id, title, startDateTime, price, isFree, thumbnailUrl, organizer, category } = event;

    const formattedStartDateTime = moment(new Date(startDateTime)).format('D MMM YYYY, h:mm a');

    return (
        <div className="group relative rounded-lg overflow-hidden shadow hover:shadow-md border bg-background max-w-md size-full mx-auto">
            <div className='size-full flex flex-col'>
                <Link href={`/events/${_id}/details`}>
                    <figure className='aspect-video bg-gray-100 dark:bg-gray-900 overflow-hidden flex items-center justify-center'>
                        <Image
                            src={thumbnailUrl}
                            alt={title}
                            width={500}
                            height={281.25}
                            className="object-cover w-full transition-transform group-hover:scale-[1.03] duration-500"
                        />
                    </figure>
                </Link>
                <div className='w-full flex-1'>
                    <Link href={`/events/${_id}/details`}>
                        <div className="p-4 space-y-3 h-full w-full">
                            <div className='flex flex-wrap gap-2'>
                                <span className="event-card-badge bg-green-600/20 text-green-600 rounded-full">
                                    {isFree ? "FREE" : "$" + price}
                                </span>
                                <span className="event-card-badge bg-muted rounded-full">
                                    {category?.name}
                                </span>
                            </div>
                            <h3 className='font-medium text-foreground/80 text flex gap-1 items-center'><CalendarClockIcon className='size-4 text-rose-500' />{formattedStartDateTime}</h3>
                            <h3 className="text-lg font-medium leading-6 line-clamp-2">{title}</h3>
                        </div>
                    </Link>
                </div>
                <h1 className={`font-semibold text-foreground/80 line-clamp-1 p-4 pt-0 ${ordersLink && 'hidden'}`}>By : {organizer?.name}</h1>

                {ordersLink && <Link href={`/events/${_id}/orders?title=${title}`} className={`text-blue-500 hover:underline line-clamp-1 p-4 pt-0 flex items-center gap-1 self-end`}>
                    <span>View Orders</span>
                    <ExternalLink className='size-4' />
                </Link>
                }

            </div>
            {session?.user?.id === organizer?._id &&
                <div className='flex flex-col bg-background/70 p-1 size-max rounded-md absolute top-1 right-1'>
                    <Button variant="ghost" size="icon" className="size-7" asChild>
                        <Link href={`events/${_id}/update`}><Edit className='size-5 text-secondary' /></Link>
                    </Button>
                    <EventDeleteConfirmation eventId={_id} />
                </div>
            }
        </div>
    )
}

export default EventCard