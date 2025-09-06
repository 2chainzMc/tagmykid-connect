"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"parent" | "admin" | "staff" | "shop_manager">("parent")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Supabase auth
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError(authError.message)
      setIsLoading(false)
      return
    }

    if (data?.user) {
      // Fetch profile with role
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single()

      if (profileError) {
        setError("Profile not found")
        setIsLoading(false)
        return
      }

      const userRole = profile?.role || "parent"

      toast({
        title: "Welcome back!",
        description: `Successfully logged in as ${userRole}.`,
      })

      // Redirect by role
      if (userRole === "admin") {
        router.push("/admin/dashboard")
      } else if (userRole === "staff") {
        router.push("/staff/dashboard")
      } else if (userRole === "shop_manager") {
        router.push("/shop/dashboard")
      } else {
        router.push("/parent/dashboard")
      }
    }

    setIsLoading(false)
  }

  const handleDemoLogin = async (demoRole: string) => {
    setRole(demoRole as any)
    let demoEmail = ""
    let demoPassword = "password123" // set this same for all demo accounts

    if (demoRole === "parent") demoEmail = "parent@demo.com"
    if (demoRole === "admin") demoEmail = "admin@demo.com"
    if (demoRole === "staff") demoEmail = "staff@demo.com"
    if (demoRole === "shop_manager") demoEmail = "shop@demo.com"

    setEmail(demoEmail)
    setPassword(demoPassword)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Sign in</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <Link href="/auth/register" className="font-medium text-blue-600 hover:text-blue-500">
              create a new account
            </Link>
          </p>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign in
          </Button>
        </form>

        {/* Demo Accounts */}
        <div className="mt-6">
          <p className="text-center text-sm text-gray-600">Demo Accounts:</p>
          <div className="mt-2 flex flex-wrap gap-2 justify-center">
            <Button variant="outline" size="sm" onClick={() => handleDemoLogin("parent")}>
              Parent
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleDemoLogin("admin")}>
              Admin
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleDemoLogin("staff")}>
              Staff
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleDemoLogin("shop_manager")}>
              Shop Manager
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
