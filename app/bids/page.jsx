"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  ArrowLeft,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  Download,
  MoreHorizontal,
  Zap,
  Target,
} from "lucide-react"
import Link from "next/link"

export default function BidManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date")

  // Mock data - in real app this would come from API
  const bids = [
    {
      id: "BID-001",
      blackoutId: "BO-2024-001",
      blackoutDate: "2024-01-15",
      blackoutTime: "14:30",
      quantity: 2.5,
      bidPrice: 0.15,
      currentTopBid: 0.14,
      totalCost: 37.5,
      status: "active",
      submittedAt: "2024-01-14T10:30:00",
    },
    {
      id: "BID-002",
      blackoutId: "BO-2024-002",
      blackoutDate: "2024-01-16",
      blackoutTime: "09:00",
      quantity: 1.8,
      bidPrice: 0.16,
      currentTopBid: 0.17,
      totalCost: 28.8,
      status: "won",
      submittedAt: "2024-01-15T08:15:00",
      result: {
        finalPrice: 0.16,
        savings: 45.2,
        energyDelivered: 1.8,
      },
    },
    {
      id: "BID-003",
      blackoutId: "BO-2024-003",
      blackoutDate: "2024-01-13",
      blackoutTime: "16:00",
      quantity: 3.2,
      bidPrice: 0.11,
      currentTopBid: 0.13,
      totalCost: 35.2,
      status: "lost",
      submittedAt: "2024-01-12T14:45:00",
    },
    {
      id: "BID-004",
      blackoutId: "BO-2024-004",
      blackoutDate: "2024-01-12",
      blackoutTime: "11:30",
      quantity: 4.0,
      bidPrice: 0.14,
      currentTopBid: 0.14,
      totalCost: 56.0,
      status: "won",
      submittedAt: "2024-01-11T16:20:00",
      result: {
        finalPrice: 0.14,
        savings: 78.4,
        energyDelivered: 4.0,
      },
    },
    {
      id: "BID-005",
      blackoutId: "BO-2024-005",
      blackoutDate: "2024-01-10",
      blackoutTime: "13:15",
      quantity: 1.5,
      bidPrice: 0.18,
      currentTopBid: 0.16,
      totalCost: 27.0,
      status: "cancelled",
      submittedAt: "2024-01-09T11:10:00",
    },
  ]

  const activeBids = bids.filter((bid) => bid.status === "active")
  const completedBids = bids.filter((bid) => ["won", "lost"].includes(bid.status))
  const latestBid = bids[0]

  const stats = {
    totalBids: bids.length,
    activeBids: activeBids.length,
    wonBids: bids.filter((bid) => bid.status === "won").length,
    totalSavings: bids.filter((bid) => bid.result).reduce((sum, bid) => sum + (bid.result?.savings || 0), 0),
    winRate: Math.round((bids.filter((bid) => bid.status === "won").length / completedBids.length) * 100),
    avgBidPrice: bids.reduce((sum, bid) => sum + bid.bidPrice, 0) / bids.length,
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800"
      case "won":
        return "bg-green-100 text-green-800"
      case "lost":
        return "bg-red-100 text-red-800"
      case "cancelled":
        return "bg-gray-100 text-gray-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <Clock className="w-4 h-4" />
      case "won":
        return <CheckCircle className="w-4 h-4" />
      case "lost":
        return <XCircle className="w-4 h-4" />
      case "cancelled":
        return <XCircle className="w-4 h-4" />
      case "pending":
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const filteredBids = bids.filter((bid) => {
    const matchesSearch =
      bid.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bid.blackoutId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || bid.status === statusFilter
    return matchesSearch && matchesStatus
  })

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
                <h1 className="text-xl font-bold text-foreground">My Bids</h1>
                <p className="text-sm text-muted-foreground">Track and manage your energy bids</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button asChild>
                <Link href="/bidding">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Place New Bid
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Latest Bid Summary */}
        {latestBid && (
          <Card className="mb-8 border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>Latest Bid Summary</span>
              </CardTitle>
              <CardDescription>Your most recent bidding activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">Bid ID</p>
                  <p className="text-lg font-bold">{latestBid.id}</p>
                  <p className="text-sm text-muted-foreground">
                    {latestBid.blackoutDate} at {latestBid.blackoutTime}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Block Size</p>
                  <p className="text-lg font-bold">{latestBid.quantity} kW</p>
                  <p className="text-sm text-muted-foreground">Energy requested</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Your Bid Price</p>
                  <p className="text-lg font-bold">${latestBid.bidPrice.toFixed(3)}/kWh</p>
                  <p className="text-sm text-muted-foreground">Total: ${latestBid.totalCost.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Top Bid</p>
                  <p className="text-lg font-bold">${latestBid.currentTopBid.toFixed(3)}/kWh</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline" className={getStatusColor(latestBid.status)}>
                      {getStatusIcon(latestBid.status)}
                      <span className="ml-1 capitalize">{latestBid.status}</span>
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Bids</p>
                  <p className="text-2xl font-bold">{stats.totalBids}</p>
                </div>
                <DollarSign className="w-8 h-8 text-primary" />
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
                <Clock className="w-8 h-8 text-accent-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Won Bids</p>
                  <p className="text-2xl font-bold">{stats.wonBids}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Win Rate</p>
                  <p className="text-2xl font-bold">{stats.winRate}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Savings</p>
                  <p className="text-2xl font-bold">${stats.totalSavings.toFixed(0)}</p>
                </div>
                <Zap className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Bid Price</p>
                  <p className="text-2xl font-bold">${stats.avgBidPrice.toFixed(3)}</p>
                </div>
                <Target className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by bid ID or blackout ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="won">Won</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="amount">Amount</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Bid Tables */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="all">All Bids</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>All Bids</CardTitle>
                <CardDescription>Complete history of your energy bids</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Bid ID</TableHead>
                      <TableHead>Blackout</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Bid Price</TableHead>
                      <TableHead>Total Cost</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Result</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBids.map((bid) => (
                      <TableRow key={bid.id}>
                        <TableCell className="font-medium">{bid.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{bid.blackoutId}</p>
                            <p className="text-sm text-muted-foreground">
                              {bid.blackoutDate} at {bid.blackoutTime}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{bid.quantity} kW</TableCell>
                        <TableCell>${bid.bidPrice.toFixed(3)}/kWh</TableCell>
                        <TableCell>${bid.totalCost.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusColor(bid.status)}>
                            {getStatusIcon(bid.status)}
                            <span className="ml-1 capitalize">{bid.status}</span>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {bid.result ? (
                            <div className="text-sm">
                              <p className="font-medium text-green-600">+${bid.result.savings.toFixed(2)}</p>
                              <p className="text-muted-foreground">{bid.result.energyDelivered} kW delivered</p>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              {bid.status === "active" && (
                                <DropdownMenuItem className="text-red-600">Cancel Bid</DropdownMenuItem>
                              )}
                              <DropdownMenuItem>Download Receipt</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="active">
            <Card>
              <CardHeader>
                <CardTitle>Active Bids</CardTitle>
                <CardDescription>Bids currently in the market</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Bid ID</TableHead>
                      <TableHead>Blackout</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Your Bid</TableHead>
                      <TableHead>Current Top</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeBids.map((bid) => (
                      <TableRow key={bid.id}>
                        <TableCell className="font-medium">{bid.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{bid.blackoutId}</p>
                            <p className="text-sm text-muted-foreground">
                              {bid.blackoutDate} at {bid.blackoutTime}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{bid.quantity} kW</TableCell>
                        <TableCell>${bid.bidPrice.toFixed(3)}/kWh</TableCell>
                        <TableCell>${bid.currentTopBid.toFixed(3)}/kWh</TableCell>
                        <TableCell>
                          {bid.bidPrice >= bid.currentTopBid ? (
                            <Badge variant="default" className="bg-green-100 text-green-800">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Leading
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-red-100 text-red-800">
                              <TrendingDown className="w-3 h-3 mr-1" />
                              Behind
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Modify
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600 bg-transparent">
                              Cancel
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

          <TabsContent value="completed">
            <Card>
              <CardHeader>
                <CardTitle>Completed Bids</CardTitle>
                <CardDescription>Historical bid results and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Bid ID</TableHead>
                      <TableHead>Blackout</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Final Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Savings</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {completedBids.map((bid) => (
                      <TableRow key={bid.id}>
                        <TableCell className="font-medium">{bid.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{bid.blackoutId}</p>
                            <p className="text-sm text-muted-foreground">
                              {bid.blackoutDate} at {bid.blackoutTime}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{bid.quantity} kW</TableCell>
                        <TableCell>
                          {bid.result ? `$${bid.result.finalPrice.toFixed(3)}/kWh` : `$${bid.bidPrice.toFixed(3)}/kWh`}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusColor(bid.status)}>
                            {getStatusIcon(bid.status)}
                            <span className="ml-1 capitalize">{bid.status}</span>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {bid.result ? (
                            <span className="font-medium text-green-600">+${bid.result.savings.toFixed(2)}</span>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
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
