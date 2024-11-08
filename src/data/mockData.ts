import { format } from "date-fns"

export const recentRewards = [
  { id: 1, user: "Jane Doe", type: "Mission", amount: 500, description: "Completed Tutorial Creation", timestamp: "2024-03-08 14:30" },
  { id: 2, user: "John Smith", type: "Discord Activity", amount: 50, description: "Helpful response", timestamp: "2024-03-08 13:15" },
  { id: 3, user: "Alice Johnson", type: "Manual Reward", amount: 200, description: "Community event participation", timestamp: "2024-03-08 12:00" },
]

export const pendingMissions = [
  { id: 1, user: "Jane Doe", missionName: "Create Tutorial", submission: "Created React hooks tutorial", timestamp: "2024-03-08 11:30", reward: { points: 500, tokens: 50 } },
  { id: 2, user: "Bob Wilson", missionName: "Bug Report", submission: "Found and reported navigation bug", timestamp: "2024-03-08 10:45", reward: { points: 200, tokens: 20 } },
]

export const badges = [
  { id: 1, name: "Early Adopter", description: "Joined during beta", holders: 156 },
  { id: 2, name: "Top Contributor", description: "Made significant contributions", holders: 45 },
  { id: 3, name: "Bug Hunter", description: "Reported critical bugs", holders: 78 },
]

export const tiers = [
  { name: "Bronze", users: 234, pointsRequired: 0, color: "#CD7F32" },
  { name: "Silver", users: 122, pointsRequired: 1000, color: "#C0C0C0" },
  { name: "Gold", users: 45, pointsRequired: 5000, color: "#FFD700" },
  { name: "Platinum", users: 12, pointsRequired: 10000, color: "#E5E4E2" },
]

export const missions = [
  { id: 1, name: "Create Tutorial", description: "Create a tutorial for our platform", reward: { points: 500, tokens: 50 }, status: "open", startDate: "2024-03-01", endDate: "2024-03-31", maxBudget: 5000 },
  { id: 2, "name": "Bug Reporting", description: "Report bugs in the latest release", reward: { points: 200, tokens: 20 }, status: "open", startDate: "2024-03-15", endDate: "2024-04-15", maxBudget: 2000 },
  { id: 3, name: "Community Event", description: "Organize a community meetup", reward: { points: 1000, tokens: 100 }, status: "upcoming", startDate: "2024-04-01", endDate: "2024-04-30", maxBudget: 10000 },
]

export const leaderboardData = [
  { position: 1, name: "Emma Thompson", points: 5200, change: 0 },
  { position: 2, name: "Liam Johnson", points: 4800, change: 2 },
  { position: 3, name: "Olivia Davis", points: 4600, change: -1 },
  { position: 4, name: "Noah Wilson", points: 4400, change: 1 },
  { position: 5, name: "Ava Brown", points: 4200, change: -2 },
  { position: 6, name: "Ethan Taylor", points: 4000, change: 3 },
  { position: 7, name: "Sophia Anderson", points: 3800, change: -1 },
  { position: 8, name: "Mason Martinez", points: 3600, change: 0 },
  { position: 9, name: "Isabella Lopez", points: 3400, change: 2 },
  { position: 10, name: "William Lee", points: 3200, change: -3 },
]

export const missionCompletionData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    {
      label: 'Completion Rate',
      data: [65, 72, 78, 85],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }
  ]
}

export const pointDistributionData = {
  labels: ['Discord', 'Telegram', 'Manual', 'Missions'],
  datasets: [
    {
      data: [300, 200, 150, 350],
      backgroundColor: ['#7289DA', '#0088cc', '#4CAF50', '#FFA500'],
    }
  ]
}

export const ambassadorActivityData = [
  { date: '2024-03-01', count: 5 },
  { date: '2024-03-02', count: 8 },
  { date: '2024-03-03', count: 12 },
  { date: '2024-03-04', count: 3 },
  { date: '2024-03-05', count: 7 },
  // ... more data for the past year
]

export const ambassadorActivityPeriods = {
  labels: ['Past 5 days', 'Past 2 weeks', 'Inactive'],
  datasets: [
    {
      data: [25, 40, 35],
      backgroundColor: ['#4CAF50', '#FFA500', '#FF6347'],
    }
  ]
}