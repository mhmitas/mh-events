"use client"
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export const NavbarLinks = ({ session, navbarType }) => {
    const pathname = usePathname();

    if (navbarType === "large") {
        return (
            <>
                <LinkComponent name={"Home"} href={"/"} pathname={pathname} />
                {session?.user?.role === "organizer" && <LinkComponent name={"Create Event"} href={"/events/create"} pathname={pathname} />}
                {session && <LinkComponent name={"My Profile"} href={"/profile"} pathname={pathname} />}
            </>
        )
    }
    if (navbarType === "small") {
        return <>
            <DropdownMenuItemComponent name={"Home"} href={"/"} pathname={pathname} />
            {session?.user?.role === "organizer" && <DropdownMenuItemComponent name={"Create Event"} href={"/events/create"} pathname={pathname} />}
            {session && <DropdownMenuItemComponent name={"My Profile"} href={"/profile"} pathname={pathname} />}
        </>
    }
    return <>
        <Link href="/">Home</Link>
    </>

}

function LinkComponent({ href, pathname, name }) {
    return (
        <Link
            href={href}
            className={cn(
                "py-1 text-sm font-medium transition-colors border-b-2 border-transparent hover:border-blue-600 rounded-none",
                pathname === href && "border-b-2 border-blue-600"
            )}
        >
            {name}
        </Link>
    )
}

function DropdownMenuItemComponent({ name, pathname, href }) {

    return (
        <DropdownMenuItem key={name} asChild className={`${pathname === href && "bg-muted/60"}`}>
            <Link href={href} className={`w-full`}>
                {name}
            </Link>
        </DropdownMenuItem>
    )
}