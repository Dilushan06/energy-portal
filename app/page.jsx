"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Zap,
  Clock,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Activity,
  Calendar,
  Settings,
  Bell,
  User,
} from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  // Mock data - in real app this would come from API
  const user = {
    name: "John Smith",
    company: "TechCorp Industries",
  }

  const stats = {
    currentUsage: 2.4,
    allocatedEnergy: 5.0,
    nextBlackout: "2h 15m",
    activeBids: 3,
    totalSavings: 1250,
    efficiency: 87,
  }

  const recentBids = [
    { id: 1, amount: 2.5, price: 0.12, status: "active", time: "2h ago" },
    { id: 2, amount: 1.8, price: 0.15, status: "won", time: "1d ago" },
    { id: 3, amount: 3.2, price: 0.11, status: "lost", time: "2d ago" },
  ]

  const upcomingBlackouts = [
    { id: 1, date: "Today", time: "14:30", duration: "2h", zone: "Zone A" },
    { id: 2, date: "Tomorrow", time: "09:00", duration: "1.5h", zone: "Zone B" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">LECO</h1>
                <p className="text-sm text-muted-foreground">Management Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <Link href="/login">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">{user.name}</span>
              </div>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Welcome back, {user.name}!</h2>
                  <p className="text-primary-foreground/80 mb-4">
                    Energy Portal • Energy efficiency at {stats.efficiency}%
                  </p>
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <Activity className="w-4 h-4" />
                      <span>Current: {stats.currentUsage} kW</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>Next blackout: {stats.nextBlackout}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">${stats.totalSavings}</div>
                  <div className="text-sm text-primary-foreground/80">Total Savings</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Current Usage</p>
                  <p className="text-2xl font-bold">{stats.currentUsage} kW</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="mt-4">
                <Progress value={(stats.currentUsage / stats.allocatedEnergy) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  {stats.currentUsage} / {stats.allocatedEnergy} kW allocated
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Bids</p>
                  <p className="text-2xl font-bold">{stats.activeBids}</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-accent-foreground" />
                </div>
              </div>
              <div className="mt-4">
                <Badge variant="secondary" className="text-xs">
                  2 pending results
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Efficiency</p>
                  <p className="text-2xl font-bold">{stats.efficiency}%</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs text-green-600">+5% from last month</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Next Blackout</p>
                  <p className="text-2xl font-bold">{stats.nextBlackout}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <div className="mt-4">
                <Badge variant="outline" className="text-xs">
                  Zone A • 2h duration
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Quick Actions</span>
              </CardTitle>
              <CardDescription>Manage your energy efficiently</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild variant="outline" className="w-full justify-start bg-transparent" size="lg">
                <Link href="/bidding">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Place New Bid
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start bg-transparent" size="lg">
                <Link href="/blackouts">
                  <Clock className="w-4 h-4 mr-2" />
                  View Blackout Schedule
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start bg-transparent" size="lg">
                <Link href="/usage">
                  <Activity className="w-4 h-4 mr-2" />
                  Usage Analytics
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Recent Bids */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Bids</CardTitle>
              <CardDescription>Your latest bidding activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBids.map((bid) => (
                  <div key={bid.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">{bid.amount} kW</p>
                      <p className="text-sm text-muted-foreground">
                        ${bid.price}/kWh • {bid.time}
                      </p>
                    </div>
                    <Badge
                      variant={bid.status === "won" ? "default" : bid.status === "active" ? "secondary" : "outline"}
                    >
                      {bid.status}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button asChild variant="outline" className="w-full mt-4">
                <Link href="/bids">View All Bids</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Blackouts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Upcoming Blackouts</span>
              </CardTitle>
              <CardDescription>Plan your energy usage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingBlackouts.map((blackout) => (
                  <div key={blackout.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{blackout.date}</span>
                      <Badge variant="outline">{blackout.zone}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>
                        {blackout.time} • {blackout.duration} duration
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button asChild variant="outline" className="w-full mt-4">
                <Link href="/blackouts">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  View Full Schedule
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
