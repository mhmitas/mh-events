import React from 'react'
import { LogOut, Settings, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { signOut } from '@/auth'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
signOut

const NavbarUserSec = ({ session }) => {
    return (
        <>
            {session ?
                <DropdownMenu>
                    <DropdownMenuTrigger title="Profile menu" asChild className="cursor-pointer" >
                        <Avatar>
                            <AvatarImage src={session?.user?.image} />
                            <AvatarFallback className="bg-gradient-to-tr from-rose-100 to-blue-100 hover:from-rose-200 hover:to-blue-200">{session?.user?.name[0]}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <Link href='/profile'><DropdownMenuItem className="space-x-2">
                            <Settings className="size-5" />
                            <span>Manage Account</span>
                        </DropdownMenuItem></Link>
                        <form
                            action={async () => {
                                "use server"
                                await signOut()
                            }}
                        >
                            <DropdownMenuItem asChild>
                                <button type="submit" className="w-full space-x-2">
                                    <LogOut className="size-5" />
                                    <span>Sign Out</span>
                                </button>
                            </DropdownMenuItem>
                        </form>
                    </DropdownMenuContent>
                </DropdownMenu>
                :
                <Button size="sm" className="space-x-1" asChild>
                    <Link href="sign-in"><User className="w-5" /><span>Sign In</span></Link>
                </Button>
            }
        </>
    )
}

export default NavbarUserSec