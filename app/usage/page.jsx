"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  ArrowLeft,
  Activity,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Filter,
  Zap,
  Clock,
  DollarSign,
  Lightbulb,
} from "lucide-react"
import Link from "next/link"

export default function UsageAnalytics() {
  const [timeRange, setTimeRange] = useState("24h")
  const [selectedMetric, setSelectedMetric] = useState("power")

  // Mock data - in real app this would come from API
  const hourlyData = [
    { time: "00:00", power: 2.1, cost: 0.25, efficiency: 85 },
    { time: "01:00", power: 1.8, cost: 0.22, efficiency: 88 },
    { time: "02:00", power: 1.6, cost: 0.19, efficiency: 90 },
    { time: "03:00", power: 1.5, cost: 0.18, efficiency: 92 },
    { time: "04:00", power: 1.4, cost: 0.17, efficiency: 93 },
    { time: "05:00", power: 1.7, cost: 0.2, efficiency: 89 },
    { time: "06:00", power: 2.3, cost: 0.28, efficiency: 82 },
    { time: "07:00", power: 3.1, cost: 0.37, efficiency: 78 },
    { time: "08:00", power: 4.2, cost: 0.5, efficiency: 72 },
    { time: "09:00", power: 4.8, cost: 0.58, efficiency: 68 },
    { time: "10:00", power: 4.5, cost: 0.54, efficiency: 71 },
    { time: "11:00", power: 4.3, cost: 0.52, efficiency: 73 },
    { time: "12:00", power: 4.7, cost: 0.56, efficiency: 69 },
    { time: "13:00", power: 4.9, cost: 0.59, efficiency: 67 },
    { time: "14:00", power: 4.6, cost: 0.55, efficiency: 70 },
    { time: "15:00", power: 4.4, cost: 0.53, efficiency: 72 },
    { time: "16:00", power: 4.1, cost: 0.49, efficiency: 75 },
    { time: "17:00", power: 3.8, cost: 0.46, efficiency: 77 },
    { time: "18:00", power: 3.5, cost: 0.42, efficiency: 79 },
    { time: "19:00", power: 3.2, cost: 0.38, efficiency: 81 },
    { time: "20:00", power: 2.9, cost: 0.35, efficiency: 83 },
    { time: "21:00", power: 2.6, cost: 0.31, efficiency: 85 },
    { time: "22:00", power: 2.4, cost: 0.29, efficiency: 86 },
    { time: "23:00", power: 2.2, cost: 0.26, efficiency: 87 },
  ]

  const weeklyData = [
    { day: "Mon", power: 78.5, cost: 9.42, efficiency: 76 },
    { day: "Tue", power: 82.1, cost: 9.85, efficiency: 74 },
    { day: "Wed", power: 75.3, cost: 9.04, efficiency: 78 },
    { day: "Thu", power: 79.8, cost: 9.58, efficiency: 75 },
    { day: "Fri", power: 84.2, cost: 10.1, efficiency: 73 },
    { day: "Sat", power: 65.7, cost: 7.88, efficiency: 82 },
    { day: "Sun", power: 58.9, cost: 7.07, efficiency: 85 },
  ]

  const applianceBreakdown = [
    { name: "HVAC System", label: "HVAC System", value: 35, color: "#0891b2" },
    { name: "Lighting", label: "Lighting", value: 20, color: "#facc15" },
    { name: "Office Equipment", label: "Office Equipment", value: 18, color: "#22c55e" },
    { name: "Server Room", label: "Server Room", value: 15, color: "#f97316" },
    { name: "Water Heater", label: "Water Heater", value: 8, color: "#8b5cf6" },
    { name: "Other", label: "Other", value: 4, color: "#64748b" },
  ]

  const stats = {
    currentPower: 3.2,
    avgPower: 3.8,
    peakPower: 4.9,
    totalCost: 45.67,
    efficiency: 76,
    carbonSaved: 125,
  }

  const chartConfig = {
    power: {
      label: "Power (kW)",
      color: "hsl(var(--chart-1))",
    },
    cost: {
      label: "Cost ($)",
      color: "hsl(var(--chart-2))",
    },
    efficiency: {
      label: "Efficiency (%)",
      color: "hsl(var(--chart-3))",
    },
    "HVAC System": {
      label: "HVAC System",
      color: "#0891b2",
    },
    Lighting: {
      label: "Lighting",
      color: "#facc15",
    },
    "Office Equipment": {
      label: "Office Equipment",
      color: "#22c55e",
    },
    "Server Room": {
      label: "Server Room",
      color: "#f97316",
    },
    "Water Heater": {
      label: "Water Heater",
      color: "#8b5cf6",
    },
    Other: {
      label: "Other",
      color: "#64748b",
    },
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
                <h1 className="text-xl font-bold text-foreground">Usage Analytics</h1>
                <p className="text-sm text-muted-foreground">Monitor your energy consumption patterns</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Last 24h</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
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
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Current Power</p>
                  <p className="text-2xl font-bold">{stats.currentPower} kW</p>
                </div>
                <Activity className="w-8 h-8 text-primary" />
              </div>
              <div className="mt-2">
                <Badge variant="secondary" className="text-xs">
                  Live
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Average Power</p>
                  <p className="text-2xl font-bold">{stats.avgPower} kW</p>
                </div>
                <Zap className="w-8 h-8 text-accent-foreground" />
              </div>
              <div className="mt-2 flex items-center text-xs text-green-600">
                <TrendingDown className="w-3 h-3 mr-1" />
                -5% vs last week
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Peak Power</p>
                  <p className="text-2xl font-bold">{stats.peakPower} kW</p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-500" />
              </div>
              <div className="mt-2">
                <p className="text-xs text-muted-foreground">at 13:00</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Cost</p>
                  <p className="text-2xl font-bold">${stats.totalCost}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
              <div className="mt-2">
                <p className="text-xs text-muted-foreground">This month</p>
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
                <Clock className="w-8 h-8 text-blue-500" />
              </div>
              <div className="mt-2 flex items-center text-xs text-green-600">
                <TrendingUp className="w-3 h-3 mr-1" />
                +3% vs last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Carbon Saved</p>
                  <p className="text-2xl font-bold">{stats.carbonSaved} kg</p>
                </div>
                <Lightbulb className="w-8 h-8 text-green-600" />
              </div>
              <div className="mt-2">
                <p className="text-xs text-muted-foreground">CO₂ equivalent</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Real-time Usage Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Real-time Energy Consumption</CardTitle>
                  <CardDescription>Power usage over the last 24 hours</CardDescription>
                </div>
                <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="power">Power (kW)</SelectItem>
                    <SelectItem value="cost">Cost ($)</SelectItem>
                    <SelectItem value="efficiency">Efficiency (%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={hourlyData}>
                    <defs>
                      <linearGradient id="colorPower" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey={selectedMetric}
                      stroke="hsl(var(--chart-1))"
                      fillOpacity={1}
                      fill="url(#colorPower)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Appliance Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Usage by Appliance</CardTitle>
              <CardDescription>Energy consumption breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={applianceBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {applianceBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload
                          return (
                            <div className="bg-background border rounded-lg p-3 shadow-lg">
                              <p className="font-medium">{data.name}</p>
                              <p className="text-sm text-muted-foreground">{data.value}% of total usage</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="mt-4 space-y-2">
                {applianceBreakdown.slice(0, 4).map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span>{item.name}</span>
                    </div>
                    <span className="font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Comparison */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Weekly Comparison</CardTitle>
            <CardDescription>Daily energy usage patterns over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="power" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Detailed Analytics */}
        <Tabs defaultValue="trends" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
            <TabsTrigger value="costs">Costs</TabsTrigger>
          </TabsList>

          <TabsContent value="trends">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>Usage Trends</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span>Peak hours</span>
                    <span className="font-medium">9:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span>Low usage</span>
                    <span className="font-medium">2:00 AM - 6:00 AM</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span>Weekend reduction</span>
                    <span className="font-medium text-green-600">-25%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>Monthly Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span>Total consumption</span>
                    <span className="font-medium">2,847 kWh</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span>Average daily</span>
                    <span className="font-medium">91.8 kWh</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span>vs last month</span>
                    <span className="font-medium text-green-600">-8.3%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="efficiency">
            <Card>
              <CardHeader>
                <CardTitle>Efficiency Metrics</CardTitle>
                <CardDescription>Track your energy efficiency improvements</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={hourlyData}>
                      <XAxis dataKey="time" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="efficiency"
                        stroke="hsl(var(--chart-3))"
                        strokeWidth={3}
                        dot={{ fill: "hsl(var(--chart-3))", strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: "hsl(var(--chart-3))", strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="costs">
            <Card>
              <CardHeader>
                <CardTitle>Cost Analysis</CardTitle>
                <CardDescription>Monitor your energy costs and savings</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={hourlyData}>
                      <defs>
                        <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="time" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="cost"
                        stroke="hsl(var(--chart-2))"
                        fillOpacity={1}
                        fill="url(#colorCost)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
