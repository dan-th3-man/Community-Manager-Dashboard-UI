"use client"

import * as React from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import confetti from 'canvas-confetti'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js'
import { FormEvent } from "react"

import { RewardManagement } from "./RewardManagement"
import { MissionsManagement } from "./MissionsManagement"
import { BadgesManagement } from "./BadgesManagement"
import { TiersManagement } from "./TiersManagement"
import { AnalyticsTab } from "./AnalyticsTab"

import {
  recentRewards,
  pendingMissions,
  badges,
  tiers,
  missions,
  leaderboardData,
  missionCompletionData,
  pointDistributionData,
  ambassadorActivityData,
  ambassadorActivityPeriods
} from "../data/mockData"

import { ChartData, ChartTypeRegistry } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title)

interface User {
  name: string;
  id: string;
  currentPoints: number;
  currentTier: string;
  badges: string[];
}

interface Mission {
  id: number;
  user: string;
  missionName: string;
  reward: {
    points: number;
    tokens: number;
  };
}

const defaultData: ChartData<'line', number[], string> = {
  labels: [],
  datasets: [{
    label: 'No Data',
    data: [],
    borderColor: '#ccc',
  }]
}

const defaultPieData: ChartData<'pie', number[], string> = {
  labels: ['No Data'],
  datasets: [{
    label: 'No Data',
    data: [1],
    backgroundColor: ['#ccc'],
    borderColor: ['#ccc'],
    borderWidth: 1
  }]
}

export default function CommunityManagerDashboard() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null)
  const [rewardType, setRewardType] = React.useState("points")
  const [rewardPlatform, setRewardPlatform] = React.useState("discord")
  const [showNewTierDialog, setShowNewTierDialog] = React.useState(false)
  const [showNewBadgeDialog, setShowNewBadgeDialog] = React.useState(false)
  const [recentRewardsState, setRecentRewardsState] = React.useState(recentRewards)
  const [badgesState, setBadgesState] = React.useState(badges)
  const [missionsState, setMissionsState] = React.useState(missions)
  const [tiersState, setTiersState] = React.useState(tiers)
  const [pendingMissionsState, setPendingMissionsState] = React.useState(pendingMissions)
  const [newMission, setNewMission] = React.useState({
    name: "",
    description: "",
    reward: { points: 0, tokens: 0 },
    startDate: "",
    endDate: "",
    maxBudget: 0
  })
  const [newTier, setNewTier] = React.useState({
    name: "",
    pointsRequired: 0,
    color: "#000000"
  })

  const handleUserSearch = () => {
    // Simulate user search
    if (searchQuery) {
      setSelectedUser({
        name: "Jane Doe",
        id: "12345",
        currentPoints: 2750,
        currentTier: "Silver",
        badges: ["Early Adopter", "Bug Hunter"]
      })
    }
  }

  const handleRewardSubmission = (e: FormEvent) => {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    // Simulate reward submission
    const newReward = {
      id: recentRewardsState.length + 1,
      user: selectedUser?.name ?? "Unknown User",
      type: rewardType,
      amount: parseInt((form.elements.namedItem('amount') as HTMLInputElement).value),
      description: (form.elements.namedItem('description') as HTMLInputElement).value,
      timestamp: new Date().toLocaleString(),
      platform: rewardPlatform
    }
    setRecentRewardsState([newReward, ...recentRewardsState])
    confetti()
    // Reset form
    form.reset()
    setSelectedUser(null)
    setRewardType("points")
    setRewardPlatform("discord")
  }

  const handleMissionApproval = (mission: Mission) => {
    // Simulate mission approval
    const newReward = {
      id: recentRewardsState.length + 1,
      user: mission.user,
      type: "Mission",
      amount: mission.reward.points,
      description: `Completed mission: ${mission.missionName}`,
      timestamp: new Date().toLocaleString()
    }
    setRecentRewardsState([newReward, ...recentRewardsState])
    // Remove the approved mission from pending missions
    setPendingMissionsState(pendingMissionsState.filter(m => m.id !== mission.id))
    confetti()
  }

  const handleMissionRejection = (missionId: number) => {
    // Remove the rejected mission from pending missions
    setPendingMissionsState(pendingMissionsState.filter(m => m.id !== missionId))
  }

  const handleNewBadgeSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const newBadge = {
      id: badgesState.length + 1,
      name: (form.elements.namedItem('badgeName') as HTMLInputElement).value,
      description: (form.elements.namedItem('badgeDescription') as HTMLInputElement).value,
      holders: 0
    }
    setBadgesState([...badgesState, newBadge])
    setShowNewBadgeDialog(false)
    confetti()
  }

  const handleNewMissionSubmission = (e: React.FormEvent) => {
    e.preventDefault()
    const newMissionEntry = {
      id: missionsState.length + 1,
      ...newMission,
      status: "upcoming"
    }
    setMissionsState([...missionsState, newMissionEntry])
    setNewMission({
      name: "",
      description: "",
      reward: { points: 0, tokens: 0 },
      startDate: "",
      endDate: "",
      maxBudget: 0
    })
    confetti()
  }

  const handleNewTierSubmission = (e: React.FormEvent ) => {
    e.preventDefault()
    const newTierEntry = {
      ...newTier,
      users: 0
    }
    setTiersState([...tiersState, newTierEntry])
    setShowNewTierDialog(false)
    setNewTier({
      name: "",
      pointsRequired: 0,
      color: "#000000"
    })
    confetti()
  }

  const transformedActivityData: ChartData<'pie', number[], string> = {
    labels: ambassadorActivityData.map(item => item.date),
    datasets: [{
      data: ambassadorActivityData.map(item => item.count),
      backgroundColor: ['#4CAF50', '#2196F3', '#FFC107', '#F44336'],
      borderColor: ['#4CAF50', '#2196F3', '#FFC107', '#F44336'],
      borderWidth: 1
    }]
  }

  return (
    <div className="container mx-auto p-6">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Community Manager Dashboard</h1>
          <p className="text-muted-foreground">Manage community rewards, missions, and badges</p>
        </div>
        <div className="flex items-center gap-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="discord">Discord</SelectItem>
              <SelectItem value="telegram">Telegram</SelectItem>
              <SelectItem value="github">GitHub</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>

      <Tabs defaultValue="rewards" className="space-y-4">
        <TabsList>
          <TabsTrigger value="rewards">Reward Management</TabsTrigger>
          <TabsTrigger value="missions">Missions</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="tiers">Tiers</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="rewards">
          <RewardManagement
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            rewardType={rewardType}
            setRewardType={setRewardType}
            rewardPlatform={rewardPlatform}
            setRewardPlatform={setRewardPlatform}
            recentRewardsState={recentRewardsState}
            handleUserSearch={handleUserSearch}
            handleRewardSubmission={handleRewardSubmission}
            setShowNewBadgeDialog={setShowNewBadgeDialog}
            badgesState={badgesState}
          />
        </TabsContent>

        <TabsContent value="missions">
          <MissionsManagement
            newMission={newMission}
            setNewMission={setNewMission}
            handleNewMissionSubmission={handleNewMissionSubmission}
            pendingMissionsState={pendingMissionsState}
            handleMissionApproval={handleMissionApproval}
            handleMissionRejection={handleMissionRejection}
            missionsState={missionsState}
          />
        </TabsContent>

        <TabsContent value="badges">
          <BadgesManagement
            badgesState={badgesState}
            setShowNewBadgeDialog={setShowNewBadgeDialog}
          />
        </TabsContent>

        <TabsContent value="tiers">
          <TiersManagement
            tiersState={tiersState}
            setShowNewTierDialog={setShowNewTierDialog}
          />
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsTab
            leaderboardData={leaderboardData ?? []}
            missionCompletionData={missionCompletionData ?? defaultData}
            pointDistributionData={pointDistributionData as ChartData<'pie', number[], string> ?? defaultPieData}
            ambassadorActivityData={transformedActivityData ?? defaultPieData}
            ambassadorActivityPeriods={ambassadorActivityPeriods?.labels ?? []}
          />
        </TabsContent>
      </Tabs>

      <Dialog open={showNewTierDialog} onOpenChange={setShowNewTierDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Tier</DialogTitle>
            <DialogDescription>Add a new tier to the community ranking system</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleNewTierSubmission} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tier-name">Tier Name</Label>
              <Input
                id="tier-name"
                value={newTier.name}
                onChange={(e) => setNewTier({...newTier, name: e.target.value})}
                placeholder="Enter tier name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="points-required">Points Required</Label>
              <Input
                id="points-required"
                type="number"
                value={newTier.pointsRequired}
                onChange={(e) => setNewTier({...newTier, pointsRequired: parseInt(e.target.value)})}
                placeholder="Enter points required"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tier-color">Tier Color</Label>
              <Input
                id="tier-color"
                type="color"
                value={newTier.color}
                onChange={(e) => setNewTier({...newTier, color: e.target.value})}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Create Tier</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showNewBadgeDialog} onOpenChange={setShowNewBadgeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Badge</DialogTitle>
            <DialogDescription>Create a new badge for community achievements</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleNewBadgeSubmission} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="badge-name">Badge Name</Label>
              <Input id="badge-name" name="badgeName" placeholder="Enter badge name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="badge-description">Description</Label>
              <Textarea id="badge-description" name="badgeDescription" placeholder="Enter badge description" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="badge-image">Badge Image</Label>
              <Input id="badge-image" type="file" accept="image/*" />
            </div>
            <DialogFooter>
              <Button type="submit">Create Badge</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}