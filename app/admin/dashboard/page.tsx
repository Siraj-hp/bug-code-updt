"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChallengeList } from "@/components/admin/challenge-list"
import { ParticipantList } from "@/components/admin/participant-list"
import { AdminHeader } from "@/components/admin/admin-header"

export default function AdminDashboardPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const adminAuth = localStorage.getItem("adminAuthenticated")
    if (adminAuth !== "true") {
      router.push("/admin")
      return
    }
    setIsAuthenticated(true)
  }, [router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader />

      <main className="container mx-auto p-4 pt-24">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Link href="/admin/challenges/new">
            <Button>Create New Challenge</Button>
          </Link>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Platform Overview</CardTitle>
                  <CardDescription>Key metrics for your debugging challenge platform</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (
                      confirm(
                        "Are you sure you want to reset all statistics? This will set participants, challenges completed, and submissions to 0.",
                      )
                    ) {
                      // In a real app, you'd call an API to reset the data
                      // For this demo, we'll just show an alert
                      alert("Statistics have been reset successfully!")
                      // Reload the page to show the reset stats
                      window.location.reload()
                    }
                  }}
                >
                  Reset Stats
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-lg border bg-card p-4 text-center">
                  <p className="text-sm font-medium text-muted-foreground">Total Challenges</p>
                  <p className="text-3xl font-bold">6</p>
                </div>
                <div className="rounded-lg border bg-card p-4 text-center">
                  <p className="text-sm font-medium text-muted-foreground">Total Participants</p>
                  <p className="text-3xl font-bold">0</p>
                </div>
                <div className="rounded-lg border bg-card p-4 text-center">
                  <p className="text-sm font-medium text-muted-foreground">Submissions</p>
                  <p className="text-3xl font-bold">0</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="challenges">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="challenges">Challenges</TabsTrigger>
              <TabsTrigger value="participants">Participants</TabsTrigger>
            </TabsList>
            <TabsContent value="challenges" className="mt-4">
              <ChallengeList />
            </TabsContent>
            <TabsContent value="participants" className="mt-4">
              <ParticipantList />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
