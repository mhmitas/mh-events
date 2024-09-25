import { QrCode } from 'lucide-react'
import moment from 'moment';
import React from 'react'
import { FaLocationDot } from 'react-icons/fa6';
import { FcCalendar } from 'react-icons/fc';

const TicketCard = ({ ticket }) => {
    const { _id, event: { title, _id: eventId, startDateTime, endDateTime }, totalAmount } = ticket

    // FORMAT DATE&TIMES
    const formattedStartDateTime = moment(new Date(startDateTime)).format('D MMMM YYYY, h:mm a');

    return (
        <div className="w-[358px] h-48 sm:h-[210px] relative overflow-hidden rounded-xl hover:scale-105 duration-300 cursor-default hover:shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-800 via-blue-800 to-indigo-800"></div>
            {/* another background option */}
            {/* <img
                src="/images/event_calendar.png"
                alt="3D Dev Portfolio Background"
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
            /> */}
            <div className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30 bg-white"></div>
            <div className="absolute inset-0 flex flex-col justify-between p-4">
                <div className="text-white">
                    <h2 className="text-lg sm:text-2xl font-bold leading-tight mt-4 line-clamp-2">
                        {title}
                    </h2>
                    <div className='flex gap-1 mt-2 items-center text-sm sm:text-base'>
                        <FcCalendar className='size-4 sm:size-5' />
                        <p>{formattedStartDateTime}</p>
                    </div>
                    <div className="flex items-center mt-2 space-x-2 text-sm sm:text-base">
                        <FaLocationDot className="size-4 sm:size-5 text-[#f44336]" />
                        <span className="line-clamp-2"> San Francisco, CA</span>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-4 right-4 flex space-x-2">
                <div className="rounded-full flex items-center justify-center">
                    <button className='bg-white hover:bg-opacity-90 active:bg-opacity-95 text-black p-2 rounded-xl'><QrCode className='size-5 sm:size-6' /></button>
                </div>
            </div>
        </div >
    )
}

export default TicketCard