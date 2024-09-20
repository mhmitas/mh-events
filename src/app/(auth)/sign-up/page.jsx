'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import OauthSignIn from "@/components/shared/OauthSignIn"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { signUpFormSchema } from "@/lib/validators"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false)

    const form = useForm({
        resolver: zodResolver(signUpFormSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    })

    function onSubmit(values) {
        console.log(values)
    }

    return (
        <main className="bg-muted"><section className="flex items-center justify-center min-h-screen my-container py-8"><div className="max-w-md w-full bg-background text-foreground p-4 sm:p-6 rounded-lg space-y-4">
            <div className="pb-2">
                <h1 className="text-2xl font-semibold">Sign Up to Mh Events</h1>
                <h3>Create a new account to get started.</h3>
            </div>
            <Form {...form} className="">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                    {/* Name */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="space-y-1">
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Email */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="space-y-1">
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Name */}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="space-y-1">
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Create a secure password" {...field} type={showPassword ? "text" : "password"} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem className="space-y-1">
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Confirm your password" {...field} type={showPassword ? "text" : "password"} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* show password or not */}
                    <div className="flex items-center space-x-2 pt-1">
                        <Checkbox onClick={() => setShowPassword(!showPassword)} variant="secondary" id="show_password" />
                        <Label htmlFor="show_password" className="font-medium">Show Password</Label>
                    </div>
                    <div className="pt-3">
                        <Button variant="secondary" className="w-full" type="submit">Submit</Button>
                    </div>
                </form>
            </Form>
            <div className="text-sm">
                Already have an account?{" "}
                <Link href="/sign-in" className="text-blue-500 hover:underline">Sign in</Link>
            </div>
            <p className="text-center w-full">Or sign in with</p>
            <OauthSignIn />
        </div></section></main>
    )
}