"use server"

import { revalidatePath } from "next/cache"
import { deleteImageFromCloudinary, uploadImageOnCloudinary } from "../cloudinary/UploadFileOnCloudinary"
import { Category } from "../database/models/category.model"
import { Event } from "../database/models/event.model"
import { User } from "../database/models/user.model"
import { connectDB } from "../database/mongoose"

// CREATE EVENT
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

// UPDATE EVENT
export async function updateEvent({ userId, event, formData, eventId, path }) {
    try {
        await connectDB()
        // verify the user
        const organizer = await User.findById(userId).select("_id")
        if (!organizer) return { error: "Couldn't find the organizer." };

        // get the thumbnail file from request if the user has changed the thumbnail.
        const thumbnail = formData.get('thumbnail');

        // upload the thumbnail to the cloudinary
        let thumbnailUrl = event?.thumbnailUrl || "/images/default-event-thumbnail.png";
        if (thumbnail) {
            try {
                thumbnailUrl = await uploadImageOnCloudinary(thumbnail);
                deleteImageFromCloudinary(event?.thumbnailUrl)
            } catch (error) {
                console.error("Error uploading thumbnail:", error);
            }
        }

        // modify data before upload
        event.price = event?.isFree ? 0 : parseFloat(event.price) || 0;

        // create the event 
        const updatedEvent = await Event.findByIdAndUpdate(
            eventId,
            { ...event, thumbnailUrl },
            { new: true }
        )

        if (!updatedEvent) {
            return { error: "Event creation failed" };
        }

        revalidatePath(path)

        return { success: true, data: JSON.parse(JSON.stringify(updatedEvent)) }
    } catch (error) {
        throw error
    }

}

// DELETE EVENT
export async function deleteEvent({ eventId, path }) {
    try {
        await connectDB()
        const event = await Event.findByIdAndDelete(eventId)
        if (!event) return { error: "Event not found" }
        // delete the thumbnail from cloudinary
        await deleteImageFromCloudinary(event?.thumbnailUrl)
        revalidatePath(path)
    }
    catch (error) {
        throw error
    }
}

// POPULATE EVENT
export const populateEvent = async (query) => {
    return query
        .populate({
            model: User, path: 'organizer', select: "name avatar"
        })
        .populate({
            model: Category, path: 'category', select: "name"
        })
}

// GET EVENTS
export const getEvents = async ({ page = 1, limit = 12, query, category }) => {
    try {
        await connectDB()

        console.log("Log from event.action:", { page, limit, query, category })

        const titleCondition = query ? { title: { $regex: query, $options: "i" } } : {};

        const categoryCondition = category ? { category: category } : {}

        const conditions = {
            $and: [titleCondition, categoryCondition]
        }

        const events = await populateEvent(
            Event
                .find(conditions)
                .sort({ _id: -1 })
                .limit(parseInt(limit))
                .skip(Number((page - 1) * limit))
        )

        const totalEvents = await Event.countDocuments(conditions);

        const totalPages = Math.ceil(totalEvents / limit);

        return { success: true, data: JSON.parse(JSON.stringify(events)), totalPages }
    } catch (error) {
        throw error
    }
}

// GET A EVENT BY ID
export const getEventById = async ({ eventId }) => {
    try {
        await connectDB()

        const event = await populateEvent(Event.findById(eventId))
        if (!event) throw new Error("Event not found")
        return { success: true, data: JSON.parse(JSON.stringify(event)) }
    } catch (error) {
        throw error
    }
}

// GET RELATED EVENTS BY CATEGORY
export async function getRelatedEventsByCategory({ categoryId, limit, eventId }) {
    try {
        await connectDB()

        const conditions = {
            $and: [
                { category: categoryId },
                { _id: { $ne: eventId } }
            ]
        }
        const events = await populateEvent(Event.find(conditions).sort({ _id: -1 }).limit(parseInt(limit)));

        return { success: true, data: JSON.parse(JSON.stringify(events)) }
    }
    catch (error) {
        throw error
    }
}

export async function getEventsByUser({ userId }) {
    try {
        connectDB()

        const events = await populateEvent(
            Event
                .find({ organizer: userId })
                .sort({ _id: -1 })
        )

        return { success: true, data: JSON.parse(JSON.stringify(events)) }
    } catch (error) {
        throw error;
    }

}