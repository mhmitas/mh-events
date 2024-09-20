'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import OauthSignIn from "@/components/shared/OauthSignIn"

export default function SignUp() {
    const [processing, setProcessing] = useState(false)

    async function handleRegister(e) {
        setProcessing(true)
        try {
            e.preventDefault()
            const form = e.target
            const email = form.email.value
            const password = form.password.value
            const name = form.name.value;

            const res = await axios.post('/api/auth/register', { email, password, name })
            console.log(res.data);

            setProcessing(false)
        } catch (error) {
            setProcessing(false)
            console.error("Register form submission error:", error);
            toast.error(error.message)
        }
    }

    return (
        <main className="bg-muted">
            <div className="flex items-center justify-center min-h-screen my-container py-4">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Sign Up to Mh Events</CardTitle>
                        <CardDescription>
                            Create a new account to get started.
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleRegister}>
                        <CardContent className="space-y-4">
                            <div className="space-y-1">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" name="name" placeholder="Enter your name" required />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email" type="email"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" name="password" type="password" placeholder="Enter your password" required />
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col items-start space-y-2">
                            <Button type="submit" className="w-full">
                                {processing ? 'Processing...' : "Sign Up"}
                            </Button>
                            <div className="text-sm">
                                Already have an account?{" "}
                                <Link href="/sign-in" className="text-blue-500 hover:underline">Sign in</Link>
                            </div>
                            <p className="text-center w-full">Or sign in with</p>
                            <OauthSignIn />
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </main>
    )
}