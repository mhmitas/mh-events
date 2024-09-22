"use server"

import { uploadImageOnCloudinary } from "../cloudinary/UploadFileOnCloudinary"
import { Event } from "../database/models/event.model"
import { User } from "../database/models/user.model"
import { connectDB } from "../database/mongoose"

export async function createEvent({ userId, event, formData }) {
    try {
        await connectDB()
        // verify th user
        const organizer = await User.findById(userId).select("_id")
        if (!organizer) throw new Error("Couldn't find the organizer.")

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