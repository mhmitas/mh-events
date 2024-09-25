"use client"

import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils'


export const EventsSecHeader = ({ categories }) => {
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

    const handleCategoryChange = (category) => {
        let newUrl = ''
        if (category) {
            newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: 'category',
                value: category
            })
        } else {
            newUrl = removeKeysFromQuery({
                params: searchParams.toString(),
                keysToRemove: ['category']
            })
        }

        router.push(newUrl, { scroll: false });
    }

    return (
        <div>
            <h1 className='title-1 text-center mb-6' id="event_section">Trusted by thousand of events</h1>
            <div className='max-w-3xl mx-auto flex flex-col sm:grid grid-cols-3 gap-2'>
                <div className="w-full">
                    <Select onValueChange={value => handleCategoryChange(value)} className="w-full">
                        <SelectTrigger className="focus-visible:ring-0 focus:ring-0 rounded-full p-6">
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={null}>All</SelectItem>
                            {categories.map((category) => <SelectItem key={category?._id} value={category?._id}>{category?.name}</SelectItem>)}
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
