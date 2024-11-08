import React from "react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Search, Plus } from "lucide-react"

interface RewardManagementProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedUser: any
  setSelectedUser: (user: any) => void
  rewardType: string
  setRewardType: (type: string) => void
  rewardPlatform: string
  setRewardPlatform: (platform: string) => void
  recentRewardsState: any[]
  handleUserSearch: () => void
  handleRewardSubmission: (e: React.FormEvent) => void
  setShowNewBadgeDialog: (show: boolean) => void
  badgesState: any[]
}

export function RewardManagement({
  searchQuery,
  setSearchQuery,
  selectedUser,
  setSelectedUser,
  rewardType,
  setRewardType,
  rewardPlatform,
  setRewardPlatform,
  recentRewardsState,
  handleUserSearch,
  handleRewardSubmission,
  setShowNewBadgeDialog,
  badgesState
}: RewardManagementProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Manual Reward</CardTitle>
          <CardDescription>Manually assign rewards to community members</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                placeholder="Enter Telegram or Discord"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button onClick={handleUserSearch}>
              <Search className="w-4 h-4 mr-2" />
              Find User
            </Button>
          </div>
          {selectedUser && (
            <form onSubmit={handleRewardSubmission} className="space-y-4 mt-4 p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{selectedUser.name}</h3>
                <Badge>{selectedUser.currentTier}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Current Points: {selectedUser.currentPoints}</p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reward-type">Reward Type</Label>
                  <Select onValueChange={setRewardType} defaultValue={rewardType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select reward type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="points">Points</SelectItem>
                      <SelectItem value="badge">Badge</SelectItem>
                      <SelectItem value="token">$OFT Tokens</SelectItem>
                      <SelectItem value="discord">Discord Role</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reward-platform">Platform</Label>
                  <Select onValueChange={setRewardPlatform} defaultValue={rewardPlatform}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="discord">Discord</SelectItem>
                      <SelectItem value="telegram">Telegram</SelectItem>
                      <SelectItem value="github">GitHub</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {rewardType === "badge" ? (
                  <div className="space-y-2">
                    <Label htmlFor="badge">Select Badge</Label>
                    <Select name="amount" onValueChange={(value) => {
                      if (value === "create_new") {
                        setShowNewBadgeDialog(true)
                      }
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a badge" />
                      </SelectTrigger>
                      <SelectContent>
                        {badgesState.map((badge) => (
                          <SelectItem key={badge.id} value={badge.name}>{badge.name}</SelectItem>
                        ))}
                        <SelectItem value="create_new">
                          <div className="flex items-center">
                            <Plus className="w-4 h-4 mr-2" />
                            Create New Badge
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="amount">
                      {rewardType === "discord" ? "Role Name" : "Amount"}
                    </Label>
                    <Input
                      id="amount"
                      name="amount"
                      type={rewardType === "points" || rewardType === "token" ? "number" : "text"}
                      placeholder={rewardType === "discord" ? "Enter role name" : "Enter amount"}
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter reason for reward"
                  />
                </div>
                <Button type="submit" className="w-full">Award Reward</Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Rewards</CardTitle>
          <CardDescription>Latest rewards distributed across all channels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentRewardsState.map((reward) => (
              <div key={reward.id} className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">{reward.user}</p>
                  <p className="text-sm text-muted-foreground">{reward.description}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">+{reward.amount} {reward.type}</p>
                  <p className="text-sm text-muted-foreground">{reward.timestamp}</p>
                  <Badge variant="outline">{reward.platform}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}