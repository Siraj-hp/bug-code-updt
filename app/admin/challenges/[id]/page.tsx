"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AdminHeader } from "@/components/admin/admin-header"
import { challenges } from "@/lib/challenges"

export default function EditChallengePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Find the challenge by ID
  const challenge = challenges.find((c) => c.id.toString() === params.id)

  // Form state
  const [title, setTitle] = useState("")
  const [language, setLanguage] = useState("python")
  const [description, setDescription] = useState("")
  const [buggyCode, setBuggyCode] = useState("")
  const [solutionPatterns, setSolutionPatterns] = useState("")
  const [expectedOutput, setExpectedOutput] = useState("")

  useEffect(() => {
    const adminAuth = localStorage.getItem("adminAuthenticated")
    if (adminAuth !== "true") {
      router.push("/admin")
      return
    }
    setIsAuthenticated(true)

    // Populate form with challenge data if found
    if (challenge) {
      setTitle(challenge.title)
      setLanguage(challenge.language)
      setDescription(challenge.description)
      setBuggyCode(challenge.buggyCode)
      setSolutionPatterns(challenge.solution.join(","))
      setExpectedOutput(challenge.expectedOutput)
    } else {
      // Challenge not found, redirect to dashboard
      router.push("/admin/dashboard")
    }
  }, [router, challenge])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, you'd send this to your backend API
    console.log({
      id: params.id,
      title,
      language,
      description,
      buggyCode,
      solutionPatterns,
      expectedOutput,
    })

    // Simulate successful update
    alert("Challenge updated successfully!")
    router.push("/admin/dashboard")
  }

  if (!isAuthenticated || !challenge) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader />

      <main className="container mx-auto p-4 pt-24">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Edit Challenge</h1>
          <p className="text-muted-foreground">Update the details of this debugging challenge</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Challenge Details</CardTitle>
              <CardDescription>Edit information about the challenge</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Challenge Title</Label>
                  <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Programming Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="c">C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="buggyCode">Buggy Code</Label>
                <Textarea
                  id="buggyCode"
                  value={buggyCode}
                  onChange={(e) => setBuggyCode(e.target.value)}
                  className="font-mono text-sm"
                  rows={10}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="solutionPatterns">
                  Solution Patterns
                  <span className="ml-1 text-xs text-muted-foreground">
                    (comma-separated patterns that must be in the solution)
                  </span>
                </Label>
                <Textarea
                  id="solutionPatterns"
                  value={solutionPatterns}
                  onChange={(e) => setSolutionPatterns(e.target.value)}
                  rows={2}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expectedOutput">Expected Output</Label>
                <Textarea
                  id="expectedOutput"
                  value={expectedOutput}
                  onChange={(e) => setExpectedOutput(e.target.value)}
                  rows={2}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => router.push("/admin/dashboard")}>
                Cancel
              </Button>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => {
                    if (confirm("Are you sure you want to delete this challenge?")) {
                      // In a real app, you'd send a delete request to your API
                      alert("Challenge deleted successfully!")
                      router.push("/admin/dashboard")
                    }
                  }}
                >
                  Delete
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </CardFooter>
          </Card>
        </form>
      </main>
    </div>
  )
}
