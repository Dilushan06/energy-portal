"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  DollarSign,
  Calculator,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Lightbulb,
  Wind,
  Thermometer,
  Monitor,
  Cpu,
} from "lucide-react"
import Link from "next/link"

export default function BiddingInterface() {
  const [selectedAppliances, setSelectedAppliances] = useState([])
  const [bidAmount, setBidAmount] = useState(0.15)
  const [bidQuantity, setBidQuantity] = useState(2.5)
  const [showConfirmation, setShowConfirmation] = useState(false)

  // Mock data - in real app this would come from API
  const [appliances, setAppliances] = useState([
    {
      id: "1",
      name: "LED Lighting",
      category: "Lighting",
      powerConsumption: 0.5,
      icon: <Lightbulb className="w-5 h-5" />,
      priority: "high",
      selected: true,
    },
    {
      id: "2",
      name: "HVAC System",
      category: "Climate",
      powerConsumption: 3.2,
      icon: <Wind className="w-5 h-5" />,
      priority: "high",
      selected: false,
    },
    {
      id: "3",
      name: "Water Heater",
      category: "Utilities",
      powerConsumption: 2.1,
      icon: <Thermometer className="w-5 h-5" />,
      priority: "medium",
      selected: false,
    },
    {
      id: "4",
      name: "Office Equipment",
      category: "Electronics",
      powerConsumption: 1.8,
      icon: <Monitor className="w-5 h-5" />,
      priority: "medium",
      selected: true,
    },
    {
      id: "5",
      name: "Server Room",
      category: "IT",
      powerConsumption: 4.5,
      icon: <Cpu className="w-5 h-5" />,
      priority: "high",
      selected: false,
    },
  ])

  const bidBlocks = [
    { id: "1", size: 1.0, currentTopBid: 0.12, totalBids: 15, timeRemaining: "2h 15m" },
    { id: "2", size: 2.5, currentTopBid: 0.14, totalBids: 23, timeRemaining: "2h 15m" },
    { id: "3", size: 5.0, currentTopBid: 0.16, totalBids: 8, timeRemaining: "2h 15m" },
    { id: "4", size: 10.0, currentTopBid: 0.18, totalBids: 12, timeRemaining: "2h 15m" },
  ]

  const userStats = {
    allocatedEnergy: 5.0, // kW
    currentUsage: 2.3, // kW
    availableCredit: 1500, // $
  }

  // Calculate total energy demand from selected appliances
  const totalEnergyDemand = appliances
    .filter((appliance) => appliance.selected)
    .reduce((sum, appliance) => sum + appliance.powerConsumption, 0)

  const energyDeficit = Math.max(0, totalEnergyDemand - userStats.allocatedEnergy)
  const totalBidCost = bidQuantity * bidAmount

  const handleApplianceToggle = (applianceId) => {
    setAppliances((prev) =>
      prev.map((appliance) =>
        appliance.id === applianceId ? { ...appliance, selected: !appliance.selected } : appliance,
      ),
    )
  }

  const handlePlaceBid = () => {
    setShowConfirmation(true)
    // In real app, this would submit the bid to the API
    setTimeout(() => {
      setShowConfirmation(false)
      // Redirect to bids page or show success message
    }, 3000)
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50"
      case "medium":
        return "text-yellow-600 bg-yellow-50"
      case "low":
        return "text-green-600 bg-green-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
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
                <h1 className="text-xl font-bold text-foreground">Energy Bidding</h1>
                <p className="text-sm text-muted-foreground">Bid for additional energy during blackouts</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                2h 15m remaining
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Appliance Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Energy Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="w-5 h-5" />
                  <span>Energy Calculation</span>
                </CardTitle>
                <CardDescription>Select appliances to calculate your energy needs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">Allocated Energy</p>
                    <p className="text-2xl font-bold text-primary">{userStats.allocatedEnergy} kW</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">Required Energy</p>
                    <p className="text-2xl font-bold text-foreground">{totalEnergyDemand.toFixed(1)} kW</p>
                  </div>
                  <div className="text-center p-4 bg-accent/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Energy Deficit</p>
                    <p className="text-2xl font-bold text-accent-foreground">{energyDeficit.toFixed(1)} kW</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Energy Usage</span>
                    <span>
                      {totalEnergyDemand.toFixed(1)} / {userStats.allocatedEnergy} kW
                    </span>
                  </div>
                  <Progress value={(totalEnergyDemand / userStats.allocatedEnergy) * 100} className="h-3" />
                  {energyDeficit > 0 && (
                    <p className="text-sm text-accent-foreground flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      You need to bid for {energyDeficit.toFixed(1)} kW additional energy
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Appliance Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Appliances</CardTitle>
                <CardDescription>Choose which appliances you need to run during the blackout</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appliances.map((appliance) => (
                    <div
                      key={appliance.id}
                      className={`flex items-center justify-between p-4 border rounded-lg transition-colors ${
                        appliance.selected ? "border-primary bg-primary/5" : "border-border"
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <Checkbox
                          checked={appliance.selected}
                          onCheckedChange={() => handleApplianceToggle(appliance.id)}
                        />
                        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                          {appliance.icon}
                        </div>
                        <div>
                          <p className="font-medium">{appliance.name}</p>
                          <p className="text-sm text-muted-foreground">{appliance.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant="outline" className={getPriorityColor(appliance.priority)}>
                          {appliance.priority}
                        </Badge>
                        <div className="text-right">
                          <p className="font-medium">{appliance.powerConsumption} kW</p>
                          <p className="text-sm text-muted-foreground">Power</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Bidding Interface */}
          <div className="space-y-6">
            {/* Available Bid Blocks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Available Blocks</span>
                </CardTitle>
                <CardDescription>Current market prices for energy blocks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {bidBlocks.map((block) => (
                  <div key={block.id} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">{block.size} kW</p>
                        <p className="text-sm text-muted-foreground">{block.totalBids} bids</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">${block.currentTopBid}/kWh</p>
                        <p className="text-xs text-muted-foreground">Top bid</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent"
                      onClick={() => setBidQuantity(block.size)}
                    >
                      Select {block.size} kW
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Bid Placement */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5" />
                  <span>Place Your Bid</span>
                </CardTitle>
                <CardDescription>Set your bid amount and quantity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="quantity">Energy Quantity (kW)</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={bidQuantity}
                      onChange={(e) => setBidQuantity(Number(e.target.value))}
                      step="0.1"
                      min="0.1"
                      max="20"
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Recommended: {energyDeficit.toFixed(1)} kW</p>
                  </div>

                  <div>
                    <Label htmlFor="bid-amount">Bid Price ($/kWh)</Label>
                    <div className="mt-2 space-y-2">
                      <Slider
                        value={[bidAmount]}
                        onValueChange={(value) => setBidAmount(value[0])}
                        max={0.25}
                        min={0.08}
                        step={0.01}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>$0.08</span>
                        <span className="font-medium text-foreground">${bidAmount.toFixed(3)}/kWh</span>
                        <span>$0.25</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Quantity:</span>
                    <span className="font-medium">{bidQuantity} kW</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bid Price:</span>
                    <span className="font-medium">${bidAmount.toFixed(3)}/kWh</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Cost:</span>
                    <span>${totalBidCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Available Credit:</span>
                    <span>${userStats.availableCredit}</span>
                  </div>
                </div>

                <Button
                  onClick={handlePlaceBid}
                  className="w-full"
                  size="lg"
                  disabled={energyDeficit <= 0 || totalBidCost > userStats.availableCredit}
                >
                  {energyDeficit <= 0 ? (
                    "No Additional Energy Needed"
                  ) : totalBidCost > userStats.availableCredit ? (
                    "Insufficient Credit"
                  ) : (
                    <>
                      <DollarSign className="w-4 h-4 mr-2" />
                      Place Bid - ${totalBidCost.toFixed(2)}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Bid Placed Successfully!</h3>
                <p className="text-muted-foreground mb-4">
                  Your bid for {bidQuantity} kW at ${bidAmount.toFixed(3)}/kWh has been submitted.
                </p>
                <div className="bg-muted/50 rounded-lg p-4 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Bid ID:</span>
                    <span className="font-mono">#BID-{Date.now().toString().slice(-6)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total Cost:</span>
                    <span className="font-medium">${totalBidCost.toFixed(2)}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">You'll be notified when the bidding period closes.</p>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
