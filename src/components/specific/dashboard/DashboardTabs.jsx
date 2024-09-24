"use client"

import React, { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const DashboardTabs = () => {
  const [currentTab, setCurrentTab] = useState()
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    setCurrentTab(searchParams.get("tab"))
  }, [pathname, router, searchParams])

  function handleRouter(tab) {
    router.push(`${pathname}?tab=${tab}`)
  }

  return (
    <>
      <div className='flex items-center gap-4 text-base sm:text-lg font-semibold border-b overflow-x-auto mb-6 mt-2'>
        <TabButton tab="my_events" name="Organized Events" currentTab={currentTab} handleRouter={handleRouter} />
        <TabButton tab="my_tickets" name="Booked Tickets" currentTab={currentTab} handleRouter={handleRouter} />
        {/* <TabButton tab="orders" name="Orders" currentTab={currentTab} handleRouter={handleRouter} /> */}
      </div>
    </>
  )
}

export default DashboardTabs;


function TabButton({ tab, name, currentTab, handleRouter }) {

  return (
    <button
      onClick={() => handleRouter(tab)}
      className={`border-b-[3px] hover:bg-muted active:bg-muted/80 ${currentTab === tab ? "border-blue-500 text-foreground" : "border-transparent text-foreground/90"} min-w-max p-2 rounded-t-lg`}
    >{name}</button>
  )
}