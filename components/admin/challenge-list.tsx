"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { challenges } from "@/lib/challenges"

export function ChallengeList() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredChallenges = challenges.filter(
    (challenge) =>
      challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      challenge.language.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card>
      <div className="p-4">
        <div className="mb-4 flex items-center">
          <input
            type="text"
            placeholder="Search challenges..."
            className="w-full rounded-md border border-input px-3 py-2 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="rounded-md border">
          <div className="grid grid-cols-12 gap-4 border-b bg-muted/50 p-4 font-medium">
            <div className="col-span-5">Title</div>
            <div className="col-span-2">Language</div>
            <div className="col-span-3">Created</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {filteredChallenges.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">No challenges found</div>
          ) : (
            filteredChallenges.map((challenge) => (
              <div key={challenge.id} className="grid grid-cols-12 gap-4 border-b p-4 last:border-0">
                <div className="col-span-5 font-medium">{challenge.title}</div>
                <div className="col-span-2">
                  <Badge variant={challenge.language === "python" ? "default" : "secondary"}>
                    {challenge.language}
                  </Badge>
                </div>
                <div className="col-span-3 text-muted-foreground">{new Date().toLocaleDateString()}</div>
                <div className="col-span-2 flex justify-end gap-2">
                  <Link href={`/admin/challenges/${challenge.id}`}>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete "${challenge.title}"?`)) {
                        // In a real app, you'd call an API to delete the challenge
                        alert(`Challenge "${challenge.title}" has been deleted.`)
                        // Reload the page to show the updated list
                        window.location.reload()
                      }
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Card>
  )
}
