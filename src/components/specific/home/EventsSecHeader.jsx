"use client"

import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { addQueryToUrl, formUrlQuery, removeKeysFromQuery } from '@/lib/utils'


export const EventsSecHeader = () => {
    const [query, setQuery] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        let newUrl = ''

        if (query) {
            newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: 'query',
                value: query
            })
        } else {
            newUrl = removeKeysFromQuery({
                params: searchParams.toString(),
                keysToRemove: ['query']
            })
        }

        router.push(newUrl, { scroll: false });
    }, [query, searchParams, router])


    return (
        <div>
            <h1 className='title-1 text-center mb-6' id="event_section">Trusted by thousand of events</h1>
            <div className='max-w-3xl mx-auto flex flex-col sm:grid grid-cols-3 gap-2'>
                <div className="w-full">
                    <Select className="w-full">
                        <SelectTrigger className="focus-visible:ring-0 focus:ring-0 rounded-full p-6">
                            <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    setQuery(e.target.search.value);
                }} className="w-full col-span-2 flex">
                    <Input
                        onChange={(e) => {
                            e.target.value?.length === 0 && setQuery("")
                        }}
                        name="search"
                        placeholder="🔍 Search Events..."
                        type="text"
                        className="focus-visible:ring-0 rounded-full w-full text-base p-6 rounded-r"
                    />
                    <Button type="submit" variant="secondary" className="p-6 rounded-r-full border"><Search /></Button>
                </form>
            </div>
        </div>
    )
}
