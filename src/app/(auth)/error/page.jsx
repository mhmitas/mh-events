"use client"
import { useSearchParams } from 'next/navigation'
import React from 'react'

const page = () => {
    const search = useSearchParams()
    const error = search.get("error")
    return (
        <main className='w-full min-h-screen flex justify-center items-center bg-muted px-6'>
            <div className='bg-background p-6 rounded-lg shadow-lg text-center'>
                <h3 className='text-2xl font-bold'>{error}</h3>
                <p className='text-lg'>An error occurred during authentication. Please try again.</p>
                <p className='text-start pt-4 font-medium font-mono'><strong>Hints</strong>: If you've signed in using Google, you must continue to sign in with Google. You cannot switch to email and password. Similarly, if you've signed in with an email and password, you cannot sign in using Google.</p>
            </div>
        </main>
    )
}

export default page