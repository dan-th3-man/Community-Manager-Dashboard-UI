import React from "react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Calendar } from "./ui/calendar"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "../lib/utils"

interface MissionsManagementProps {
  newMission: any
  setNewMission: (mission: any) => void
  handleNewMissionSubmission: (e: React.FormEvent) => void
  pendingMissionsState: any[]
  handleMissionApproval: (mission: any) => void
  handleMissionRejection: (missionId: number) => void
  missionsState: any[]
}

export function MissionsManagement({
  newMission,
  setNewMission,
  handleNewMissionSubmission,
  pendingMissionsState,
  handleMissionApproval,
  handleMissionRejection,
  missionsState
}: MissionsManagementProps) {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 mb-4">
        <Card>
          <CardHeader>
            <CardTitle>Create New Mission</CardTitle>
            <CardDescription>Set up a new community mission</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleNewMissionSubmission} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mission-name">Mission Name</Label>
                <Input
                  id="mission-name"
                  value={newMission.name}
                  onChange={(e) => setNewMission({...newMission, name: e.target.value})}
                  placeholder="Enter mission name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mission-description">Description</Label>
                <Textarea
                  id="mission-description"
                  value={newMission.description}
                  onChange={(e) => setNewMission({...newMission, description: e.target.value})}
                  placeholder="Enter mission description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="points-reward">Points Reward</Label>
                  <Input
                    id="points-reward"
                    type="number"
                    value={newMission.reward.points}
                    onChange={(e) =>
                      setNewMission({
                        ...newMission,
                        reward: {...newMission.reward, points: parseInt(e.target.value)}
                      })
                    }
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="token-reward">Token Reward</Label>
                  <Input
                    id="token-reward"
                    type="number"
                    value={newMission.reward.tokens}
                    onChange={(e) =>
                      setNewMission({
                        ...newMission,
                        reward: {...newMission.reward, tokens: parseInt(e.target.value)}
                      })
                    }
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !newMission.startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newMission.startDate ? format(newMission.startDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={newMission.startDate}
                        onSelect={(date) => setNewMission({...newMission, startDate: date})}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !newMission.endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newMission.endDate ? format(newMission.endDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={newMission.endDate}
                        onSelect={(date) => setNewMission({...newMission, endDate: date})}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-budget">Max Budget (Optional)</Label>
                <Input
                  id="max-budget"
                  type="number"
                  value={newMission.maxBudget}
                  onChange={(e) => setNewMission({...newMission, maxBudget: parseInt(e.target.value)})}
                  placeholder="Enter max budget"
                />
              </div>
              <Button type="submit" className="w-full">Create Mission</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Submissions</CardTitle>
            <CardDescription>Review and approve mission submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingMissionsState.map((mission) => (
                <div key={mission.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{mission.user}</h4>
                      <p className="text-sm text-muted-foreground">{mission.missionName}</p>
                    </div>
                    <Badge>{mission.timestamp}</Badge>
                  </div>
                  <p className="text-sm mb-2">{mission.submission}</p>
                  <p className="text-sm font-medium mb-4">
                    Reward: {mission.reward.points} points, {mission.reward.tokens} tokens
                  </p>
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                      onClick={() => handleMissionRejection(mission.id)}
                    >
                      Reject
                    </Button>
                    <Button
                      variant="default"
                      className="flex-1 bg-green-500 hover:bg-green-600"
                      onClick={() => handleMissionApproval(mission)}
                    >
                      Approve
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Missions</CardTitle>
          <CardDescription>Overview of current and upcoming missions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {missionsState.map((mission) => (
              <div key={mission.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{mission.name}</h4>
                    <p className="text-sm text-muted-foreground">{mission.description}</p>
                  </div>
                  <Badge>{mission.status}</Badge>
                </div>
                <p className="text-sm mb-2">
                  Reward: {mission.reward.points} points, {mission.reward.tokens} tokens
                </p>
                <p className="text-sm">
                  {format(new Date(mission.startDate), "PPP")} - {format(new Date(mission.endDate), "PPP")}
                </p>
                {mission.maxBudget > 0 && (
                  <p className="text-sm">Max Budget: {mission.maxBudget} points</p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  )
}