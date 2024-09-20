import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { Button } from '../ui/button';

const OauthSignIn = () => {
    return (
        <div className='w-full'>
            <Button variant="outline" type="button" size="lg" className="w-full space-x-2 bg-muted"><FcGoogle className='text-2xl' /><span>Google</span></Button>
        </div>
    )
}

export default OauthSignIn