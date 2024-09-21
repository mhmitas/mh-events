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
import toast from "react-hot-toast"
import { signUp } from "@/lib/actions/sign-up.actions"
import { Loader2 } from "lucide-react"
import SignUpSuccessModal from "@/components/modals/SignUpSuccessModal"

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false)
    const [showSuccessDialog, setShowSuccessDialog] = useState(false)
    const form = useForm({
        resolver: zodResolver(signUpFormSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    })

    async function onSubmit(values) {
        try {
            const res = await signUp({ values })
            if (res?.success) {
                form.reset()
                setShowSuccessDialog(true)
            }
            if (res?.error) {
                toast.error(res.error)
            }
        } catch (error) {
            console.error("Sign Up error: " + error)
            toast.error(error.message)
        }
    }
    // TODO: Have to solve sign up email issues
    return (
        <main className="bg-muted"><section className="flex items-center justify-center min-h-screen my-container py-8"><div className="max-w-md w-full bg-background text-foreground p-6 rounded-lg space-y-4 shadow-md">
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
                                    <Input placeholder="Enter your name" {...field} type="text" />
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
                                    <Input placeholder="Enter your email" {...field} type="email" />
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
                        <Button disabled={form.formState.isSubmitting} variant="secondary" className="w-full disabled:opacity-90 space-x-2" type="submit">
                            {form.formState.isSubmitting ?
                                <><span><Loader2 className="animate-spin" /></span><span>Signing Up</span></> :
                                "Sign Up"
                            }
                        </Button>
                    </div>
                </form>
            </Form>
            <div className="">
                Already have an account?{" "}
                <Link href="/sign-in" className="text-blue-500 hover:underline">Sign in</Link>
            </div>
            <p className="text-center w-full">Or sign in with</p>
            <OauthSignIn />
        </div>
            <SignUpSuccessModal isOpen={showSuccessDialog} setIsOpen={setShowSuccessDialog} />
        </section></main>
    )
}