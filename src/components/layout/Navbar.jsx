import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { NavbarLinks } from "../specific/navigation/NavbarLinks"
import { auth } from "@/auth"
import NavbarUserSec from "../specific/navigation/NavbarUserSec"

export default async function Navbar() {

    const session = await auth();
    // console.log("Session from navbar:", session);

    return (
        <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md shadow-sm dark:border-b">
            <div className="my-container">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-2xl font-bold text-primary">
                            MH EVENTS
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-6">
                            <NavbarLinks session={session} navbarType={"large"} />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* sign in user's section */}
                        <NavbarUserSec session={session} />
                        {/* small device menu */}
                        <div className="md:hidden flex items-center gap-1">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild title="Navigation menu">
                                    <Button variant="outline" size="icon" className="focus-visible:ring-0 focus:ring-0 size-9">
                                        <Menu className="size-[22px]" />
                                        <span className="sr-only">Open menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <NavbarLinks session={session} navbarType={"small"} />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </div>
        </nav >
    )
}