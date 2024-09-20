'use client'
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const images = [
    "https://i.ibb.co.com/0Y1tmwY/1.jpg",
    "https://i.ibb.co.com/t4xtJ2j/2.jpg",
    "https://i.ibb.co.com/JC5JdLM/3.jpg",
]

export default function Hero() {
    const [currentImage, setCurrentImage] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    const nextImage = () => {
        setCurrentImage((prevImage) => (prevImage + 1) % images.length)
    }

    const prevImage = () => {
        setCurrentImage((prevImage) => (prevImage - 1 + images.length) % images.length)
    }

    return (
        <section className="w-full bg-gradient-to-b from-blue-500/20 to-transparent flex items-center justify-center py-12 lg:py-24 xl:py-28">
            <div className="my-container w-full">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                    <div className="flex-1 text-center lg:text-left space-y-4 sm:space-y-6">
                        <h1 className="text-3xl sm:text-5xl xl:text-6xl font-extrabold text-foreground leading-tight">
                            Create Unforgettable Events
                        </h1>
                        <p className="text-lg sm:text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto lg:mx-0">
                            Host, manage, book, and execute stunning events with ease using our powerful platform.
                        </p>
                        <Button size="lg" variant="secondary" asChild>
                            <Link href="/events">Get Started</Link>
                        </Button>
                    </div>
                    <div className="flex-1 w-full max-w-xl lg:max-w-none relative">
                        <div className="relative aspect-video overflow-hidden rounded-lg shadow-l">
                            {images.map((src, index) => (
                                <Image
                                    key={src}
                                    src={src}
                                    alt={`Event ${index + 1}`}
                                    className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${index === currentImage ? 'opacity-100' : 'opacity-0'}`}
                                    width={600}
                                    height={450}
                                />
                            ))}
                            <div className="absolute inset-0 flex items-center justify-between p-4">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full bg-background/50 text-foreground hover:bg-background/80"
                                    onClick={prevImage}
                                >
                                    <ChevronLeft className="h-6 w-6" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full bg-background/50 text-foreground hover:bg-background/80"
                                    onClick={nextImage}
                                >
                                    <ChevronRight className="h-6 w-6" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}