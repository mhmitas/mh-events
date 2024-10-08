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
                {session && <LinkComponent name={"Create Event"} href={"/events/create"} pathname={pathname} />}
                {session && <LinkComponent name={"Dashboard"} href={"/dashboard?tab=my_events"} pathname={pathname} />}
            </>
        )
    }
    if (navbarType === "small") {
        return <>
            <DropdownMenuItemComponent name={"Home"} href={"/"} pathname={pathname} />
            {session && <DropdownMenuItemComponent name={"Create Event"} href={"/events/create"} pathname={pathname} />}
            {session && <DropdownMenuItemComponent name={"Dashboard"} href={"/dashboard?tab=my_events"} pathname={pathname} />}
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