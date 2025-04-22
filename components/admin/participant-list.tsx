"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock participant data
const participants = [
  { id: 1, name: "John Doe", score: 5, completedChallenges: 5, lastActive: "2023-05-15T10:30:00" },
  { id: 2, name: "Jane Smith", score: 3, completedChallenges: 3, lastActive: "2023-05-15T11:45:00" },
  { id: 3, name: "Bob Johnson", score: 6, completedChallenges: 6, lastActive: "2023-05-14T09:15:00" },
  { id: 4, name: "Alice Brown", score: 4, completedChallenges: 4, lastActive: "2023-05-13T14:20:00" },
  { id: 5, name: "Charlie Davis", score: 2, completedChallenges: 2, lastActive: "2023-05-12T16:10:00" },
  { id: 6, name: "Eva Wilson", score: 1, completedChallenges: 1, lastActive: "2023-05-11T13:30:00" },
]

export function ParticipantList() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredParticipants = participants.filter((participant) =>
    participant.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card>
      <div className="p-4">
        <div className="mb-4 flex items-center">
          <input
            type="text"
            placeholder="Search participants..."
            className="w-full rounded-md border border-input px-3 py-2 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="rounded-md border">
          <div className="grid grid-cols-12 gap-4 border-b bg-muted/50 p-4 font-medium">
            <div className="col-span-4">Name</div>
            <div className="col-span-2">Score</div>
            <div className="col-span-3">Completed</div>
            <div className="col-span-3">Last Active</div>
          </div>

          {filteredParticipants.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">No participants found</div>
          ) : (
            filteredParticipants.map((participant) => (
              <div key={participant.id} className="grid grid-cols-12 gap-4 border-b p-4 last:border-0">
                <div className="col-span-4 font-medium">{participant.name}</div>
                <div className="col-span-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    {participant.score} points
                  </Badge>
                </div>
                <div className="col-span-3">{participant.completedChallenges} challenges</div>
                <div className="col-span-3 text-muted-foreground">
                  {new Date(participant.lastActive).toLocaleDateString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Card>
  )
}
