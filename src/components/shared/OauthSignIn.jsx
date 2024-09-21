import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { Button } from '../ui/button';
import { signIn } from "next-auth/react"

const OauthSignIn = () => {
    return (
        <div className='w-full'>
            <Button onClick={() => signIn("google", { redirect: true, redirectTo: "/" })} variant="outline" type="button" size="lg" className="w-full space-x-2 bg-muted"><FcGoogle className='text-2xl' /><span>Google</span></Button>
        </div>
    )
}

export default OauthSignIn