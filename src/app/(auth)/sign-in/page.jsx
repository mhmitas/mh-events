'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import OauthSignIn from "@/components/shared/OauthSignIn"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { signInFormSchema } from "@/lib/validators"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"

export default function SignIn() {
    const [showPassword, setShowPassword] = useState(false)

    const form = useForm({
        resolver: zodResolver(signInFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <main className="bg-muted"><section className="flex items-center justify-center min-h-screen my-container py-8"><div className="max-w-md w-full bg-background text-foreground p-6 rounded-lg space-y-4 shadow-md">
            <div className="pb-2">
                <h1 className="text-2xl font-semibold">Sign In to Mh Events</h1>
                <h3>Enter your email and password to access your account.</h3>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter you email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter you password" {...field} type={showPassword ? "text" : "password"} />
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
                                <><span><Loader2 className="animate-spin" /></span><span>Signing In</span></> :
                                "Sign In"
                            }
                        </Button>
                    </div>
                </form>
            </Form>
            <div>
                <Link href="/sign-up" className="text-sm">
                    Already have an account?{" "}
                    <span className="text-blue-500 hover:underline">Sign Up</span>
                </Link>
            </div>
            <p className="text-center w-full">Or sign in with</p>
            <OauthSignIn />
        </div>
        </section></main>
    )
}