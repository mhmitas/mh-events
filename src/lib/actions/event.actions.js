"use server"

import { uploadImageOnCloudinary } from "../cloudinary/UploadFileOnCloudinary"
import { Category } from "../database/models/category.model"
import { Event } from "../database/models/event.model"
import { User } from "../database/models/user.model"
import { connectDB } from "../database/mongoose"

export async function createEvent({ userId, event, formData }) {
    try {
        await connectDB()
        // verify th user
        const organizer = await User.findById(userId).select("_id")
        if (!organizer) return { error: "Couldn't find the organizer." };

        // get the thumbnail file from request
        const thumbnail = formData.get('thumbnail')
        if (!thumbnail) return { error: "Thumbnail not found" };

        // upload the thumbnail to the cloudinary
        let thumbnailUrl = "/images/default-event-thumbnail.png";
        try {
            thumbnailUrl = await uploadImageOnCloudinary(thumbnail);
        } catch (error) {
            console.error("Error uploading thumbnail:", error);
        }

        // modify data before upload
        event.price = event?.isFree ? 0 : parseFloat(event.price) || 0;

        // create the event 
        const newEvent = await Event.create({
            ...event,
            thumbnailUrl,
            organizer: userId
        })

        if (!newEvent) {
            return { error: "Event creation failed" };
        }

        return { success: true, data: JSON.parse(JSON.stringify(newEvent)) }
    } catch (error) {
        throw error
    }

}

export const populateEvent = async (query) => {
    return query
        .populate({
            model: User, path: 'organizer', select: "name avatar"
        })
        .populate({
            model: Category, path: 'category', select: "name"
        })
}

export const getEvents = async () => {
    await connectDB()
    try {
        const events = await populateEvent(Event.find().sort({ _id: -1 }))

        if (!events) throw new Error("Event not found");
        return { success: true, data: JSON.parse(JSON.stringify(events)) }
    } catch (error) {
        throw error
    }
}

export const getEventById = async ({ eventId }) => {
    await connectDB()
    try {
        const event = await populateEvent(Event.findById(eventId))
        if (!event) throw new Error("Event not found")
        return { success: true, data: JSON.parse(JSON.stringify(event)) }
    } catch (error) {
        throw error
    }
}