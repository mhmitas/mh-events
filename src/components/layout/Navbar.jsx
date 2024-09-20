'use client'
import Link from "next/link"
import { Menu, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function Navbar() {

    const navItems = [
        { name: "Home", href: "/" },
        { name: "Create Event", href: "/events/create" },
        { name: "Dashboard", href: "/dashboard" }
    ]

    const pathname = usePathname()

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
                            {navItems.map(item => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "py-1 text-sm font-medium transition-colors border-b-2 border-transparent hover:border-blue-600 rounded-none",
                                        pathname === item.href && "border-b-2 border-blue-600" // You can change 'blue-500' to any color you prefer
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}
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
                                {navItems.map(item => (
                                    <DropdownMenuItem key={item.name} asChild>
                                        <Link href={item.href} className="w-full">
                                            {item.name}
                                        </Link>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </nav >
    )
}