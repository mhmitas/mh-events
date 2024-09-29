"use client"

import React, { useState } from 'react'
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
import { Calendar, DollarSignIcon, ImageIcon, Link, Loader2 } from 'lucide-react'
import { Checkbox } from '../../ui/checkbox'
import EventCategoryDropdown from './EventCategoryDropdown'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'
import { createEvent, updateEvent } from '@/lib/actions/event.actions'
import { useRouter } from 'next/navigation'

const EventForm = ({ formType, event, eventId, userId }) => {
    const router = useRouter()
    const [thumbnailFile, setThumbnailFile] = useState(null)
    const [thumbnailUrl, setThumbnailUrl] = useState(event && formType === "Update" ? event?.thumbnailUrl : null)

    const { getRootProps, getInputProps } = useDropzone({
        accept: { 'image/*': [] },
        maxFiles: 1,
        onDrop: acceptedFiles => {
            if (acceptedFiles?.[0]?.size > (0.5 * 1000000)) {
                return toast.error("Max thumbnail size 500 KB allowed")
            }
            setThumbnailFile(acceptedFiles[0]);
            setThumbnailUrl(URL.createObjectURL(acceptedFiles[0]))
        }
    });

    const initialValues = event && formType === "Update" ?
        {
            ...event,
            startDateTime: new Date(event.startDateTime),
            endDateTime: new Date(event.endDateTime),
            price: event?.price?.toString(),
            category: event?.category?._id
        } :
        eventFormDefaultValue;

    // If updating an existing event, use the event data.
    // If creating a new event, use the default values.
    // 1. Define your form.
    const form = useForm({
        resolver: zodResolver(eventFormSchema),
        defaultValues: initialValues,
    })

    // 2. Define a submit handler.
    async function onSubmit(values) {
        if (formType === "Create") {
            try {
                // if user is missing, not allowed to submit
                if (!userId) throw new Error("User id not provided");

                // handle the thumbnail image
                if (!thumbnailFile) throw new Error("Thumbnail is required")

                // prepare the data for submission
                const formData = new FormData()
                formData.append("thumbnail", thumbnailFile);

                // call server action
                // ***if server don't accept mixed types data, i will convert all to form data***
                const res = await createEvent({
                    userId,
                    event: { ...values },
                    formData
                })
                if (res?.error) {
                    console.log(res.error);
                    toast.error(res.error);
                }
                if (res?.success) {
                    toast.success("New Event Created Successfully");
                    form.reset()
                    setThumbnailFile(null)
                    setThumbnailUrl(null)
                    router.push(`/events/${res.data?._id}/details`)
                }
            } catch (error) {
                console.error("Event creation error: " + error)
                toast.error(error?.message || "Something went wrong to creating the event! Please try again later")
            }
        }
        if (event && formType === "Update") {
            try {
                if (!eventId) {
                    router.back();
                    return
                }
                // if user is missing, not allowed to submit
                if (!userId) throw new Error("User id not provided");

                // prepare the data for submission
                // create a form data to handle the files upload
                const formData = new FormData()
                // if the thumbnail is changed, add it to the formData. else add the old thumbnailUrl to the values, and it will not change.
                if (thumbnailFile) {
                    formData.append("thumbnail", thumbnailFile);
                }
                // it will be delete if the thumbnail has changed or save to database again
                values.thumbnailUrl = event?.thumbnailUrl;

                // call server action
                const res = await updateEvent({
                    userId,
                    event: { ...values },
                    formData,
                    eventId,
                    path: `/events/${eventId}/details`,
                })
                if (res?.error) {
                    console.log(res.error);
                    toast.error(res.error);
                }
                if (res?.success) {
                    toast.success("Event updated Successfully");
                    form.reset()
                    setThumbnailFile(null)
                    setThumbnailUrl(null)
                    router.push(`/events/${res.data?._id}/details`)
                }
            } catch (error) {
                console.error("Event updating error: " + error)
                toast.error(error?.message || "Something went wrong to updating the event! Please try again later")
            }
        }
    }

    return (
        <div><Form {...form}><form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-3xl mx-auto border p-4 sm:p-8 rounded-lg bg-background shadow-md">

            {/* TITLE */}
            <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Enter event title" {...field} type="text" className="focus-visible:ring-0 text-base" maxLength={100} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* DESCRIPTION */}
            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel>Description</FormLabel>
                        <FormControl className="min-h-44 md:min-h-36">
                            <Textarea placeholder="Describe your event" {...field} className="focus-visible:ring-0" maxLength={800} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* CATEGORY */}
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

            {/* LOCATION */}
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

            {/* THUMBNAIL */}
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

            {/* DATE AND TIMES */}
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

            {/* PRICE */}
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

            {/* SUBMIT BUTTON */}
            <div className='text-center pt-2'>
                <Button type="submit" disabled={form.formState.isSubmitting} variant="secondary" className="disabled:opacity-80" >
                    {form.formState.isSubmitting ?
                        <>
                            <Loader2 className="animate-spin w-6" />
                            <span className='ml-1'>Processing</span>
                        </> :
                        <span>{formType} Event</span>
                    }</Button>
            </div>

        </form>
        </Form>
        </div >
    )
}

export default EventForm