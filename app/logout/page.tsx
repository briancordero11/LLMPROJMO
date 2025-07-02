"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    // In a real app, you would handle logout logic here
    // For example, clearing tokens, cookies, etc.

    // Redirect to login page after a brief delay
    const timer = setTimeout(() => {
      router.push("/login")
    }, 1000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-950">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Logging out...</h1>
        <p className="text-neutral-400">You will be redirected to the login page.</p>
      </div>
    </div>
  )
}

