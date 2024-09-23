
import { getEventById } from '@/lib/actions/event.actions'
import moment from 'moment'
import Image from 'next/image'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from '@/components/ui/button'
import { FcCalendar } from "react-icons/fc";
import { FaLocationDot } from "react-icons/fa6";
import Link from 'next/link'


const EventDetails = async ({ params: { id } }) => {
    const event = await getEventById({ eventId: id })
    if (!event?.success) return <p>Event not found</p>

    const { title, _id, description, location, thumbnailUrl, startDateTime, endDateTime, price, isFree, organizer, category, url, createdAt } = event?.data;

    const formattedStartDateTime = moment(new Date(startDateTime)).format('D MMMM YYYY, h:mm a');
    const formattedEndDateTime = moment(new Date(endDateTime)).format('D MMMM YYYY, h:mm a');

    return (
        <main className='max-w-4xl mx-auto'>
            <section className='my-container mt-4 mb-14'>
                <figure className='w-full aspect-video rounded-lg overflow-hidden flex items-center justify-center'>
                    <Image src={thumbnailUrl} width={1000} height={562.5} alt={title} className='w-full rounded-lg' />
                </figure>
                <div className='space-y-4 mt-2'>
                    <h1 className='text-2xl font-bold'>{title}</h1>
                    <div className="flex flex-wrap space-x-2 items-center">
                        <span className='event-card-badge bg-green-600/15 text-green-600 rounded-full'>{isFree ? "FREE" : "$" + price}</span>
                        <span className='event-card-badge bg-muted rounded-full'>{category?.name}</span>
                    </div>
                    <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4'>
                        <div className='flex items-center gap-2'>
                            <Avatar className="size-8 sm:size-10">
                                <AvatarImage src={organizer?.avatar} />
                                <AvatarFallback className="bg-gradient-to-r from-rose-200 to-blue-200">CN</AvatarFallback>
                            </Avatar>
                            <p className='space-x-2 font-semibold sm:text-lg'>{organizer?.name}</p>
                        </div>
                        <div>
                            <Button variant="secondary" className="rounded-full">Buy Ticket</Button>
                        </div>
                    </div>
                    <div className='space-y-2'>
                        <div className='flex gap-1'>
                            <FcCalendar className='text-2xl' />
                            <p><strong>Start: </strong>{formattedStartDateTime} {" | "} <strong>End: </strong>{formattedEndDateTime}</p>
                        </div>
                        <p className='flex gap-1'>
                            <FaLocationDot className='text-xl text-rose-500' />
                            <span>{location}</span>
                        </p>
                    </div>
                    <div>
                        <h3 className='text-xl font-bold mb-1'>Description</h3>
                        <p>{description?.split('\n')?.map((n, i) => <p key={i}>{n}</p>)}</p>
                    </div>
                    <p>Posted: {moment(new Date(createdAt), "YYYYMMDD").fromNow()}</p>
                    <div>
                        <Link href={url} className='text-blue-500'>{url}</Link>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default EventDetails