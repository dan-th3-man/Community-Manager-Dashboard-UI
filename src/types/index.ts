export interface User {
  name: string
  id: string
  currentPoints: number
  currentTier: string
  badges: string[]
}

export interface Mission {
  id: number
  name: string
  description: string
  status: 'upcoming' | 'active' | 'completed'
  reward: {
    points: number
    tokens: number
  }
  startDate: Date | null
  endDate: Date | null
  maxBudget: number
  user?: string
  missionName?: string
  submission?: string
  timestamp?: string
}

export interface Badge {
  id: number
  name: string
  description: string
  holders: number
}

export interface Tier {
  name: string
  pointsRequired: number
  color: string
  users: number
}

export interface RecentReward {
  id: number
  user: string
  type: string
  amount: number
  description: string
  timestamp: string
  platform?: string
}

export interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor?: string[]
    borderColor?: string
    borderWidth?: number
  }[]
}

export interface AnalyticsData {
  // define your analytics data structure
  metrics: {
    value: number
    label: string
  }[]
} 