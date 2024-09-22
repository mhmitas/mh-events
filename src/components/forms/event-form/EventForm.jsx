"use client"

import React, { useCallback, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { eventFormSchema } from '@/lib/validators'
import { eventFormDefaultValue } from '@/lib/constants'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from '../../ui/button'
import { Textarea } from '../../ui/textarea'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { Calendar, DollarSignIcon, ImageIcon, Link } from 'lucide-react'
import { Checkbox } from '../../ui/checkbox'
import EventCategoryDropdown from './EventCategoryDropdown'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'

const EventForm = ({ formType, event }) => {
    const [thumbnailFile, setThumbnailFile] = useState(null)
    const [thumbnailUrl, setThumbnailUrl] = useState(null)

    const { getRootProps, getInputProps } = useDropzone({
        accept: { 'image/*': [] },
        onDrop: acceptedFiles => {
            if (acceptedFiles?.[0]?.size > (0.5 * 1000000)) {
                return toast.error("Max thumbnail size 500 KB allowed")
            }
            setThumbnailFile(acceptedFiles[0]);
            setThumbnailUrl(URL.createObjectURL(acceptedFiles[0]))
        }
    });

    // const initialValues = event && formType === "update" ?
    //     {
    //         ...event,
    //         startDateTime: new Date(event.startDateTime),
    //         endDateTime: new Date(event.endDateTime)
    //     } :
    //     eventFormDefaultValue;
    const initialValues = eventFormDefaultValue;

    // If updating an existing event, use the event data.
    // If creating a new event, use the default values.
    // 1. Define your form.
    const form = useForm({
        resolver: zodResolver(eventFormSchema),
        defaultValues: initialValues,
    })

    // 2. Define a submit handler.
    function onSubmit(values) {
        if (!thumbnailFile) return toast.error("Thumbnail is required")
        console.table(values)
    }

    return (
        <div><Form {...form}><form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-3xl mx-auto border p-4 sm:p-8 rounded-lg bg-background shadow-md">
            {/* <div className="space-y-4 p-0"> */}
            <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Enter event title" {...field} type="text" className="focus-visible:ring-0 text-base" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel>Description</FormLabel>
                        <FormControl className="min-h-44 md:min-h-36">
                            <Textarea placeholder="Describe your event" {...field} className="focus-visible:ring-0" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel>Category</FormLabel>
                        <FormControl className="min-h-44 md:min-h-36">
                            <EventCategoryDropdown field={field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel>Location</FormLabel>
                        <FormControl className="">
                            <Textarea placeholder="Enter event location" {...field} className="focus-visible:ring-0" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className='-2 border bg-muted/50 rounded-lg'>
                <div {...getRootProps({ className: 'dropzone' })} className='max-w-lg mx-auto sm:my-2 cursor-pointer' title='Click to select'>
                    <input {...getInputProps()} type="file" name="thumbnail" />
                    {thumbnailUrl ?
                        <div className='rounded-lg overflow-hidden *:w-full aspect-video flex items-center justify-center shadow'>
                            <img src={thumbnailUrl} alt="thumbnail" />
                        </div>
                        :
                        <div className="flex flex-col items-center justify-center aspect-video border-2 border-dashed hover:bg-muted rounded-lg shadow">
                            <ImageIcon className="w-12 h-12 text-muted-foreground" />
                            <p className="mt-2 font-medium">Click or drag photo here to upload thumbnail</p>
                            <p className='text-xs text-muted-foreground'>Max size 500 KB</p>
                        </div>
                    }
                </div>
            </div>

            <div className="grid md:gap-8 gap-4 grid-cols-1 md:grid-cols-2">
                <FormField
                    control={form.control}
                    name="startDateTime"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Event Start Date & Time</FormLabel>
                            <FormControl className>
                                <div className="flex items-center border w-full pl-2 rounded-md">
                                    <span><Calendar /></span>
                                    <DatePicker
                                        selected={field.value}
                                        onChange={(date) => field.onChange(date)}
                                        showTimeSelect
                                        dateFormat="dd MMM YY, h:mm a"
                                        className="bg-background rounded-md input-field overflow-auto"
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="endDateTime"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Event End Date & Time</FormLabel>
                            <FormControl className>
                                <div className="flex items-center border w-full pl-2 rounded-md">
                                    <span><Calendar /></span>
                                    <DatePicker
                                        selected={field.value}
                                        onChange={(date) => field.onChange(date)}
                                        showTimeSelect
                                        dateFormat="dd MMM YY, h:mm a"
                                        className="bg-background rounded-md input-field overflow-auto"
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div className="grid md:gap-8 gap-4 grid-cols-1 md:grid-cols-2">
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <div className="flex items-center border pl-2 rounded-md">
                                    <div><DollarSignIcon /></div>
                                    <Input type="number" placeholder="Enter event price" {...field} className="outline-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none border-0 w-full" />
                                    <FormField
                                        control={form.control}
                                        name="isFree"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="flex items-center">
                                                        <Checkbox
                                                            onCheckedChange={field.onChange}
                                                            checked={field.value}
                                                            id="isFree" className="mr-2 h-5 w-5 border-2 border-primary-500" />
                                                        <label htmlFor="isFree" className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Free Ticket</label>
                                                    </div>

                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Event Url</FormLabel>
                            <FormControl>
                                <div className="flex items-center border rounded-md pl-2">
                                    <Link />
                                    <Input type="url" placeholder="Enter event URL" {...field} className="outline-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none border-0 w-full" />
                                </div>

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div className='text-center pt-2'><Button type="submit" variant="secondary" >Submit</Button></div>

        </form>
        </Form>
        </div >
    )
}

export default EventForm