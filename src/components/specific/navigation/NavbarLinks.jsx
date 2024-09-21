"use client"
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export const NavbarLinks = ({ navItems }) => {
    const pathname = usePathname()

    return (
        <>
            {navItems.map(item => (
                <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                        "py-1 text-sm font-medium transition-colors border-b-2 border-transparent hover:border-blue-600 rounded-none",
                        pathname === item.href && "border-b-2 border-blue-600"
                    )}
                >
                    {item.name}
                </Link>
            ))}
        </>
    )
}

export function SmallNavbarLinks({ navItems }) {
    return <>
        {navItems.map(item => (
            <DropdownMenuItem key={item.name} asChild>
                <Link href={item.href} className="w-full">
                    {item.name}
                </Link>
            </DropdownMenuItem>
        ))}
    </>
}