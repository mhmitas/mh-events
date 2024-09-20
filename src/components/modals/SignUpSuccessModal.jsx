import React from 'react'
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "@/components/ui/alert-dialog"
import Image from 'next/image'
import { Button } from '../ui/button'

const SignUpSuccessModal = ({ setIsOpen, isOpen }) => {
    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent className="max-w-md w-[90%] rounded-lg">
                <figure><Image className='w-full' src="/images/mail.png" width={360} height={640} /></figure>
                <AlertDialogHeader className="space-y-0">
                    <AlertDialogTitle className="text-center">Check Your Email</AlertDialogTitle>
                    <p className="text-center text-foreground/85">We have sent you a confirmation link to your email. <br />You will find a verify button in the email. Click on it and you will be verified</p>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <div className="flex w-full justify-center">
                        <Button variant="secondary" onClick={() => setIsOpen(false)}>Ok</Button>
                    </div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default SignUpSuccessModal