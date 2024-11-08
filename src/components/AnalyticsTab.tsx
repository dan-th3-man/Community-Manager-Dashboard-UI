import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { ArrowUp, ArrowDown } from "lucide-react"
import { Bar, Line, Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'
import { ChartData } from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

interface AnalyticsTabProps {
  leaderboardData: Array<{ position: number; name: string; points: number; change: number }>;
  missionCompletionData: ChartData<'line'>;
  pointDistributionData: ChartData<'pie'>;
  ambassadorActivityData: ChartData<'pie'>;
  ambassadorActivityPeriods: string[];
}

export function AnalyticsTab({
  leaderboardData,
  missionCompletionData,
  pointDistributionData,
  ambassadorActivityData,
}: AnalyticsTabProps) {
  // Generate mock data for the ambassador activity heatmap
  const generateHeatmapData = () => {
    const startDate = new Date('2023-01-01');
    const endDate = new Date('2023-12-31');
    const data = [];
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      data.push({
        date: d.toISOString().split('T')[0],
        count: Math.floor(Math.random() * 5)
      });
    }
    return data;
  };

  const heatmapData = generateHeatmapData();

  // Mock data for rewarded interactions
  const rewardedInteractionsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Discord',
        data: [65, 59, 80, 81, 56, 55, 40, 45, 50, 55, 60, 70],
        backgroundColor: 'rgba(114, 137, 218, 0.6)',
        borderColor: 'rgba(114, 137, 218, 1)',
        borderWidth: 1,
      },
      {
        label: 'Telegram',
        data: [28, 48, 40, 19, 86, 27, 90, 85, 80, 75, 70, 65],
        backgroundColor: 'rgba(0, 136, 204, 0.6)',
        borderColor: 'rgba(0, 136, 204, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Leaderboard</CardTitle>
            <CardDescription>Top community members and their rankings</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead>Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboardData?.slice(0, 5).map((user) => (
                  <TableRow key={user.position}>
                    <TableCell>{user.position}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.points}</TableCell>
                    <TableCell>
                      <div className={`flex items-center ${user.change > 0 ? 'text-green-500' : user.change < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                        {user.change > 0 ? <ArrowUp className="w-4 h-4 mr-1" /> : user.change < 0 ? <ArrowDown className="w-4 h-4 mr-1" /> : '-'}
                        {Math.abs(user.change)}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Point Distribution</CardTitle>
            <CardDescription>Breakdown of point sources</CardDescription>
          </CardHeader>
          <CardContent>
            {pointDistributionData?.datasets && <Pie data={pointDistributionData} />}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Community Member Engagement</CardTitle>
            <CardDescription>Activity distribution over time</CardDescription>
          </CardHeader>
          <CardContent>
            {ambassadorActivityData?.datasets && <Pie data={ambassadorActivityData} />}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Mission Completion Rate</CardTitle>
            <CardDescription>Weekly mission completion trends</CardDescription>
          </CardHeader>
          <CardContent>
            {missionCompletionData?.datasets && <Line data={missionCompletionData} />}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rewarded Interactions</CardTitle>
            <CardDescription>Monthly rewarded interactions on Discord and Telegram</CardDescription>
          </CardHeader>
          <CardContent>
            <Bar 
              data={rewardedInteractionsData}
              options={{
                scales: {
                  x: { stacked: true },
                  y: { stacked: true }
                }
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ambassador Activity Heatmap</CardTitle>
            <CardDescription>Daily activity levels over the past year</CardDescription>
          </CardHeader>
          <CardContent>
            <CalendarHeatmap
              startDate={new Date('2023-01-01')}
              endDate={new Date('2023-12-31')}
              values={heatmapData}
              classForValue={(value) => {
                if (!value) {
                  return 'color-empty';
                }
                return `color-scale-${Math.min(4, value.count)}`;
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}