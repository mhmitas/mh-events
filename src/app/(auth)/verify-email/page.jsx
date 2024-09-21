'use client'
import { Button } from '@/components/ui/button';
import { verifyEmail } from '@/lib/actions/sign-up.actions';
import { LoaderCircle } from 'lucide-react';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const Page = () => {
    const router = useRouter()
    const [processing, setProcessing] = useState(false)
    const searchParams = useSearchParams()
    const verificationToken = searchParams?.get('verificationToken')
    const email = searchParams?.get('email')

    if (!verificationToken) {
        redirect('/')
    }
    if (!email) {
        redirect('/')
    }

    async function verifyToken() {
        setProcessing(true)
        try {
            const res = await verifyEmail({ email, verificationToken })
            console.log(res)
            if (res?.success) {
                router.replace("/sign-in")
                toast.success("Your registration is now complete. Please sign in with you email and password")
                setProcessing(false)
            }
            if (res?.error) {
                console.log(res.error)
                toast.error(res.error)
                router.replace("/")
            }
            setProcessing(false)
        } catch (error) {
            toast.error(error.message)
            console.error(error)
            setProcessing(false)
            router.replace("/")
        }
    }

    return (
        <section className='min-h-screen w-full bg-muted dark:bg-background flex justify-center items-center'>
            <div className='max-w-sm m-2 rounded-lg w-full bg-background dark:bg-muted flex items-center flex-col shadow-md p-6 space-y-4'>
                <div className='text-center'>
                    <h3 className='text-lg font-semibold'>MhEvents</h3>
                    <p>Click to continue</p>
                </div>
                <div className='flex-1 flex items-center justify-center w-full'>
                    <Button onClick={verifyToken} variant="secondary" size="lg" className="space-x-2">
                        {processing ?
                            <><LoaderCircle className='animate-spin' /><span>Verifying</span></> :
                            "Verify"
                        }
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default Page;