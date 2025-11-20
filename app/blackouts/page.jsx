"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertTriangle,
  Clock,
  Calendar,
  Zap,
  DollarSign,
  ArrowLeft,
  Filter,
  Download,
  Bell,
  MapPin,
} from "lucide-react"
import Link from "next/link"

export default function BlackoutManagement() {
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update time every second for live countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Mock data - in real app this would come from API
  const blackouts = [
    {
      id: "1",
      date: "2024-01-15",
      time: "14:30",
      duration: "2h",
      zone: "Zone A",
      status: "upcoming",
      affectedCustomers: 1250,
      estimatedSavings: 2400,
      bidDeadline: "2024-01-15T13:30:00",
      description: "Scheduled maintenance on primary grid",
    },
    {
      id: "2",
      date: "2024-01-16",
      time: "09:00",
      duration: "1.5h",
      zone: "Zone B",
      status: "upcoming",
      affectedCustomers: 890,
      estimatedSavings: 1800,
      bidDeadline: "2024-01-16T08:00:00",
      description: "Infrastructure upgrade",
    },
    {
      id: "3",
      date: "2024-01-14",
      time: "16:00",
      duration: "3h",
      zone: "Zone A",
      status: "completed",
      affectedCustomers: 1500,
      estimatedSavings: 3200,
      description: "Emergency grid balancing",
    },
    {
      id: "4",
      date: "2024-01-13",
      time: "11:30",
      duration: "2.5h",
      zone: "Zone C",
      status: "completed",
      affectedCustomers: 750,
      estimatedSavings: 1950,
      description: "Planned system optimization",
    },
  ]

  const upcomingBlackouts = blackouts.filter((b) => b.status === "upcoming")
  const pastBlackouts = blackouts.filter((b) => b.status === "completed")
  const nextBlackout = upcomingBlackouts[0]

  // Calculate countdown for next blackout
  const getCountdown = (dateStr, timeStr) => {
    const blackoutDateTime = new Date(`${dateStr}T${timeStr}:00`)
    const diff = blackoutDateTime.getTime() - currentTime.getTime()

    if (diff <= 0) return "Started"

    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)

    return `${hours}h ${minutes}m ${seconds}s`
  }

  const getBidCountdown = (deadlineStr) => {
    if (!deadlineStr) return null
    const deadline = new Date(deadlineStr)
    const diff = deadline.getTime() - currentTime.getTime()

    if (diff <= 0) return "Closed"

    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    return `${hours}h ${minutes}m`
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button asChild variant="ghost" size="icon">
                <Link href="/">
                  <ArrowLeft className="w-5 h-5" />
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">Blackout Management</h1>
                <p className="text-sm text-muted-foreground">Monitor and manage scheduled blackouts</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Next Blackout Alert */}
        {nextBlackout && (
          <Card className="mb-8 border-orange-200 bg-orange-50/50">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-orange-900 mb-2">Next Blackout Alert</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-orange-700 font-medium">Time Remaining</p>
                        <p className="text-2xl font-bold text-orange-900">
                          {getCountdown(nextBlackout.date, nextBlackout.time)}
                        </p>
                      </div>
                      <div>
                        <p className="text-orange-700 font-medium">Schedule</p>
                        <p className="text-orange-900">
                          {nextBlackout.date} at {nextBlackout.time}
                        </p>
                        <p className="text-orange-700">
                          {nextBlackout.duration} duration • {nextBlackout.zone}
                        </p>
                      </div>
                      <div>
                        <p className="text-orange-700 font-medium">Bidding Deadline</p>
                        <p className="text-orange-900">{getBidCountdown(nextBlackout.bidDeadline)}</p>
                        <p className="text-orange-700">remaining to place bids</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <Button asChild className="bg-orange-600 hover:bg-orange-700">
                    <Link href="/bidding">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Place Bid
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    <Bell className="w-4 h-4 mr-2" />
                    Set Alert
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Upcoming</p>
                  <p className="text-2xl font-bold">{upcomingBlackouts.length}</p>
                </div>
                <Clock className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold">{blackouts.length}</p>
                </div>
                <Calendar className="w-8 h-8 text-accent-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Duration</p>
                  <p className="text-2xl font-bold">2.2h</p>
                </div>
                <Zap className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Savings</p>
                  <p className="text-2xl font-bold">$9.4K</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Blackout Tables */}
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="upcoming">Upcoming Blackouts</TabsTrigger>
            <TabsTrigger value="past">Past Blackouts</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Blackouts</CardTitle>
                <CardDescription>Scheduled blackouts with bidding opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Zone</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Affected</TableHead>
                      <TableHead>Est. Savings</TableHead>
                      <TableHead>Bid Deadline</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingBlackouts.map((blackout) => (
                      <TableRow key={blackout.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{blackout.date}</p>
                            <p className="text-sm text-muted-foreground">{blackout.time}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="flex items-center w-fit">
                            <MapPin className="w-3 h-3 mr-1" />
                            {blackout.zone}
                          </Badge>
                        </TableCell>
                        <TableCell>{blackout.duration}</TableCell>
                        <TableCell>{blackout.affectedCustomers.toLocaleString()}</TableCell>
                        <TableCell>${blackout.estimatedSavings.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p className="font-medium text-orange-600">{getBidCountdown(blackout.bidDeadline)}</p>
                            <p className="text-muted-foreground">remaining</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button asChild size="sm">
                              <Link href={`/bidding?blackout=${blackout.id}`}>
                                <DollarSign className="w-3 h-3 mr-1" />
                                Bid
                              </Link>
                            </Button>
                            <Button variant="outline" size="sm">
                              <Bell className="w-3 h-3 mr-1" />
                              Alert
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="past">
            <Card>
              <CardHeader>
                <CardTitle>Past Blackouts</CardTitle>
                <CardDescription>Historical blackout data and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Zone</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Affected</TableHead>
                      <TableHead>Actual Savings</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pastBlackouts.map((blackout) => (
                      <TableRow key={blackout.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{blackout.date}</p>
                            <p className="text-sm text-muted-foreground">{blackout.time}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="flex items-center w-fit">
                            <MapPin className="w-3 h-3 mr-1" />
                            {blackout.zone}
                          </Badge>
                        </TableCell>
                        <TableCell>{blackout.duration}</TableCell>
                        <TableCell>{blackout.affectedCustomers.toLocaleString()}</TableCell>
                        <TableCell>${blackout.estimatedSavings.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">Completed</Badge>
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <p className="text-sm text-muted-foreground truncate">{blackout.description}</p>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
