import { auth } from '@/auth'
import { MyEvents, MyTickets } from '@/components/specific/dashboard/DashboardTabContents'
import DashboardTabs from '@/components/specific/dashboard/DashboardTabs'
import React from 'react'

const page = async ({ searchParams }) => {

    const session = await auth()

    return (
        <main className='my-container mb-14'>
            <DashboardTabs />
            {searchParams.tab === "my_tickets" && <MyTickets session={session} />}
            {searchParams.tab === "my_events" && <MyEvents session={session} />}
        </main>
    )
}

export default page