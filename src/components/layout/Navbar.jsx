import Link from "next/link"
import { Menu, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { NavbarLinks, SmallNavbarLinks } from "../specific/navigation/NavbarLinks"
import { auth } from "@/auth"

export default async function Navbar() {

    const session = await auth()
    console.log(session);

    const navItems = [
        { name: "Home", href: "/" },
        { name: "Create Event", href: "/events/create" },
        { name: "Dashboard", href: "/dashboard" }
    ]

    return (
        <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md shadow-sm dark:border-b">
            <div className="my-container">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-2xl font-bold text-primary">
                            EVENTS
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-6">
                            <NavbarLinks navItems={navItems} />
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <Button size="sm" className="space-x-1" asChild>
                            <Link href="sign-in"><User className="w-5" /><span>Sign In</span></Link>
                        </Button>
                    </div>
                    <div className="md:hidden flex items-center gap-1">
                        <Button size="sm" className="space-x-1" asChild>
                            <Link href="sign-in"><User className="w-5" /><span>Sign In</span></Link>
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-6 w-6" />
                                    <span className="sr-only">Open menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <SmallNavbarLinks navItems={navItems} />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </nav >
    )
}