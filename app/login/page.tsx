"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { Github, Mail, SunMedium } from "lucide-react"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login
    setTimeout(() => {
      setIsLoading(false)
      router.push("/")
    }, 1500)
  }

  return (
    <div className="flex items-center justify-center min-h-screen relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-amber-800 animate-gradient-background"></div>
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-amber-500 rounded-full filter blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-blue-500 rounded-full filter blur-[100px] animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/3 right-1/3 w-1/4 h-1/4 bg-purple-500 rounded-full filter blur-[100px] animate-pulse animation-delay-2000"></div>
      </div>

      <Card className="w-[400px] bg-black/40 backdrop-blur-md border-neutral-800 z-10 shadow-xl">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-2">
            <div className="flex items-center gap-2">
              <SunMedium className="h-8 w-8 text-amber-500" />
              <span className="text-2xl font-bold text-white">MotoPilot</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center text-white">Sign in</CardTitle>
          <CardDescription className="text-center text-neutral-300">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="bg-black/30 backdrop-blur-sm border-neutral-700 text-white hover:bg-black/50"
            >
              <Github className="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button
              variant="outline"
              className="bg-black/30 backdrop-blur-sm border-neutral-700 text-white hover:bg-black/50"
            >
              <Mail className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-neutral-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-black/30 backdrop-blur-sm px-2 text-neutral-400">Or continue with</span>
            </div>
          </div>
          <form onSubmit={handleLogin}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="bg-black/30 backdrop-blur-sm border-neutral-700 text-white"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-white">
                    Password
                  </Label>
                  <a href="#" className="text-sm text-amber-400 hover:text-amber-300">
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  className="bg-black/30 backdrop-blur-sm border-neutral-700 text-white"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <p className="mt-2 text-center text-sm text-neutral-300">
            Don&apos;t have an account?{" "}
            <a href="#" className="text-amber-400 hover:text-amber-300">
              Sign up
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

