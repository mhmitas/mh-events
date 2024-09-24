"use client"

import React from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const DashboardTabs = () => {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentTab = () => searchParams.get('tab');

  return (
    <>
      <div className='flex items-center gap-4 text-base sm:text-lg font-medium border-b overflow-x-auto mb-4 mt-1'>
        {[
          { name: "my_events" },
          { name: "my_tickets" },
        ].map((tab, i) => <button
          onClick={() => router.push(`${pathname}?tab=${tab.name}`)}
          className={`border-b-2 active:bg-muted ${currentTab() === tab.name ? "border-blue-500" : "border-transparent"} min-w-max py-2`}
          key={i}
        >My Events - {i}</button>)}
      </div>
      {
        currentTab() === "my_tickets" && <section>
          <h1 className='title-1 mb-4 mt-6'>My Tickets</h1>
          <div>

          </div>
        </section>
      }
      {
        currentTab() === "my_events" && <section>
          <h1 className='title-1 mb-4 mt-6'>My Events</h1>
          <div>

          </div>
        </section>
      }
    </>
  )
}

export default DashboardTabs