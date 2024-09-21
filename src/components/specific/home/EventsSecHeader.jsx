import React from 'react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'


export const EventsSecHeader = () => {
    return (
        <div>
            <h1 className='title-1 mb-6' id="event_section_title">Trusted by thousand of events</h1>
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
                <div className="w-full col-span-2 flex">
                    <Input type="text" className="focus-visible:ring-0 rounded-full w-full text-base p-6 rounded-r" />
                    <Button variant="secondary" className="p-6 rounded-r-full border"><Search /></Button>
                </div>
            </div>
        </div>
    )
}
