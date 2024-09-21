import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import OauthSignIn from "@/components/shared/OauthSignIn"

export default function SignIn() {
    return (
        <main className="bg-muted">
            <div className="flex items-center justify-center min-h-screen my-container py-4">
                <Card className="w-full max-w-md shadow-md">
                    <CardHeader>
                        <CardTitle>Sign In to Mh Events</CardTitle>
                        <CardDescription>
                            Enter your email and password to access your account.
                        </CardDescription>
                    </CardHeader>
                    <form>
                        <CardContent className="space-y-4">
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>
                            <div>
                                <div className="space-y-1">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" type="password" required />
                                </div>
                                <div>
                                    <Link href="#" className="text-sm text-blue-500 hover:underline">
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col items-start space-y-2">
                            <Button type="submit" className="w-full">
                                Sign In
                            </Button>
                            <div>
                                <Link href="/sign-up" className="text-sm">
                                    Already have an account?{" "}
                                    <span className="text-blue-500 hover:underline">Sign Up</span>
                                </Link>
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