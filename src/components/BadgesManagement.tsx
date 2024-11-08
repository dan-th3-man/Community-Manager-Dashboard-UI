import React from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { BadgeCheck, Trophy, Users } from "lucide-react"

interface BadgesManagementProps {
  badgesState: any[]
  setShowNewBadgeDialog: (show: boolean) => void
}

export function BadgesManagement({ badgesState, setShowNewBadgeDialog }: BadgesManagementProps) {
  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Badge Management</CardTitle>
            <CardDescription>Create and manage community badges</CardDescription>
          </div>
          <Button onClick={() => setShowNewBadgeDialog(true)}>
            <Trophy className="w-4 h-4 mr-2" />
            Create Badge
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Badge</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Holders</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {badgesState.map((badge) => (
                <TableRow key={badge.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <BadgeCheck className="w-4 h-4 text-primary" />
                      {badge.name}
                    </div>
                  </TableCell>
                  <TableCell>{badge.description}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {badge.holders}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">View Holders</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}