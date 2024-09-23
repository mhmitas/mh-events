import { v2 as cloudinary } from "cloudinary";

// By chatGPT
// https://chatgpt.com/share/b657ecfb-bdd4-4d67-b3f9-bc6a61c984de

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImageOnCloudinary(image) {
    const imageBuffer = Buffer.from(await image.arrayBuffer())
    // Return the uploaded result as a Promise
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { public_id: `${image.name?.split(".")?.[0]}-${Date.now()}` },
            (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(result.secure_url)
                }
            }
        );
        stream.end(imageBuffer)
    })
}

export async function deleteImageFromCloudinary(url) {
    try {
        const publicId = url?.split('/')?.pop()?.split('.')?.shift();
        await cloudinary.uploader.destroy(publicId);
        return true;
    } catch (error) {
        console.log(error)
    }
}