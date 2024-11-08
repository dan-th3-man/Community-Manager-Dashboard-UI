import React from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Crown, Plus, Users } from "lucide-react"

interface TiersManagementProps {
  tiersState: any[]
  setShowNewTierDialog: (show: boolean) => void
}

export function TiersManagement({ tiersState, setShowNewTierDialog }: TiersManagementProps) {
  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Tier Management</CardTitle>
            <CardDescription>Manage community tiers and ranks</CardDescription>
          </div>
          <Button onClick={() => setShowNewTierDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add New Tier
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tiersState.map((tier) => (
              <Card key={tier.name}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Crown className="w-5 h-5" style={{ color: tier.color }} />
                    <CardTitle>{tier.name}</CardTitle>
                  </div>
                  <CardDescription>{tier.pointsRequired.toLocaleString()} points required</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{tier.users} users</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Members</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}