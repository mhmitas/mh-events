import { auth } from "@/auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { notFound } from "next/navigation"

export default async function Component() {
    const session = await auth()
    if (!session || !session?.user) {
        return notFound()
    }

    const { name, email, image, } = session?.user

    return (
        <main className="my-container my-14">
            <div className="w-full max-w-md mx-auto bg-background shadow-md rounded-lg overflow-hidden border">
                <div className="p-8 space-y-6">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-foreground">Profile</h2>
                    </div>
                    <div className="flex justify-center">
                        <Avatar className="w-24 h-24">
                            <AvatarImage src={image} alt={name} />
                            <AvatarFallback className="bg-gradient-to-tr from-rose-100 to-blue-100">{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={name}
                                readOnly
                                className="bg-muted text-foreground"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                readOnly
                                className="bg-muted text-foreground"
                            />
                        </div>
                    </div>
                </div>
                <div className="px-8 pb-8 pt-4 flex flex-col sm:flex-row gap-4">
                    <Button className="w-full sm:w-auto" variant="">Update Profile</Button>
                    <Button className="w-full sm:w-auto" variant="destructive">Sign Out</Button>
                </div>
            </div>
        </main>
    )
}