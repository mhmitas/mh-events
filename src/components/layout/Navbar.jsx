import Link from "next/link"
import { Menu, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { NavbarLinks, SmallNavbarLinks } from "../specific/navigation/NavbarLinks"
import { auth, signOut } from "@/auth"

export default async function Navbar() {

    const session = await auth()
    console.log("Session from navbar:", session);

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
                    <div className="flex items-center gap-1">
                        {session ?
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild className="cursor-pointer" >
                                    <Avatar>
                                        <AvatarImage src={session?.user?.image} />
                                        <AvatarFallback className="bg-gradient-to-tr from-rose-100 to-blue-100 hover:from-rose-200 hover:to-blue-200">{session?.user?.name[0]}</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuItem>My Profile</DropdownMenuItem>
                                    <form
                                        action={async () => {
                                            "use server"
                                            await signOut()
                                        }}
                                    >
                                        <DropdownMenuItem asChild>
                                            <button type="submit" className="w-full">Sign Out</button>
                                        </DropdownMenuItem>
                                    </form>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            :
                            <Button size="sm" className="space-x-1" asChild>
                                <Link href="sign-in"><User className="w-5" /><span>Sign In</span></Link>
                            </Button>
                        }
                        <div className="md:hidden flex items-center gap-1">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="focus-visible:ring-0 focus:ring-0">
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
            </div>
        </nav >
    )
}