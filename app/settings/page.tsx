"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SettingsPage() {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    // Simulate saving
    setTimeout(() => {
      setIsSaving(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      <header className="border-b border-neutral-800 p-4">
        <div className="container mx-auto flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/")}
            className="text-white hover:bg-neutral-800 mr-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="text-xl font-semibold text-white">Account Settings</h1>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <Tabs defaultValue="account" className="w-full max-w-3xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 bg-neutral-900">
            <TabsTrigger value="account">Account Information</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="mt-6">
            <Card className="bg-neutral-900 border-neutral-800">
              <CardHeader>
                <CardTitle className="text-white">Account Information</CardTitle>
                <CardDescription className="text-neutral-400">
                  Update your account details and contact information.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSave} className="space-y-6">
                  <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/placeholder.svg?height=96&width=96" />
                      <AvatarFallback className="bg-blue-600 text-white text-xl">JD</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-2">
                      <Button
                        variant="outline"
                        className="bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700"
                      >
                        Change Avatar
                      </Button>
                      <Button
                        variant="outline"
                        className="bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700"
                      >
                        Remove Avatar
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-white">
                          First name
                        </Label>
                        <Input
                          id="firstName"
                          defaultValue="John"
                          className="bg-neutral-800 border-neutral-700 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-white">
                          Last name
                        </Label>
                        <Input
                          id="lastName"
                          defaultValue="Doe"
                          className="bg-neutral-800 border-neutral-700 text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue="john.doe@example.com"
                        className="bg-neutral-800 border-neutral-700 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-white">
                        Phone number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        defaultValue="+1 (555) 123-4567"
                        className="bg-neutral-800 border-neutral-700 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-white">
                        Company
                      </Label>
                      <Input
                        id="company"
                        defaultValue="Acme Inc."
                        className="bg-neutral-800 border-neutral-700 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="jobTitle" className="text-white">
                        Job title
                      </Label>
                      <Input
                        id="jobTitle"
                        defaultValue="Product Manager"
                        className="bg-neutral-800 border-neutral-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" className="bg-amber-600 hover:bg-amber-700" disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="mt-6">
            <Card className="bg-neutral-900 border-neutral-800">
              <CardHeader>
                <CardTitle className="text-white">Preferences</CardTitle>
                <CardDescription className="text-neutral-400">
                  Customize your experience with MotoPilot.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="language" className="text-white">
                        Language
                      </Label>
                      <select
                        id="language"
                        className="w-full mt-1 p-2 rounded-md bg-neutral-800 border-neutral-700 text-white"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="timezone" className="text-white">
                        Timezone
                      </Label>
                      <select
                        id="timezone"
                        className="w-full mt-1 p-2 rounded-md bg-neutral-800 border-neutral-700 text-white"
                      >
                        <option value="utc-8">Pacific Time (UTC-8)</option>
                        <option value="utc-5">Eastern Time (UTC-5)</option>
                        <option value="utc+0">UTC</option>
                        <option value="utc+1">Central European Time (UTC+1)</option>
                      </select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="notifications"
                        className="rounded border-neutral-700 bg-neutral-800 text-amber-600"
                        defaultChecked
                      />
                      <Label htmlFor="notifications" className="text-white">
                        Enable email notifications
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="darkMode"
                        className="rounded border-neutral-700 bg-neutral-800 text-amber-600"
                        defaultChecked
                      />
                      <Label htmlFor="darkMode" className="text-white">
                        Use dark mode
                      </Label>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" className="bg-amber-600 hover:bg-amber-700">
                      Save Preferences
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

