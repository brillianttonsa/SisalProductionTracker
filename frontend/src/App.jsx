
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { TrendingUp, Users, Activity, DollarSign, Clock, BarChart3 } from "lucide-react"
import api from "../services/api"
import { useAuth } from "../contexts/AuthContext"

const StatCard = ({ icon: Icon, title, value, change, color = "green" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
        {change && (
          <p className={`text-sm mt-2 flex items-center ${change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
            <TrendingUp className="w-4 h-4 mr-1" />
            {change}
          </p>
        )}
      </div>
      <div className={`p-3 rounded-full bg-${color}-100`}>
        <Icon className={`w-6 h-6 text-${color}-600`} />
      </div>
    </div>
  </motion.div>
)

const ActivityItem = ({ activity }) => (
  <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
    <div className="flex items-center space-x-3">
      <div
        className={`w-2 h-2 rounded-full ${
          activity.status === "approved"
            ? "bg-green-500"
            : activity.status === "pending"
              ? "bg-yellow-500"
              : "bg-red-500"
        }`}
      ></div>
      <div>
        <p className="font-medium text-gray-900">{activity.activity_type}</p>
        <p className="text-sm text-gray-500">{activity.worker_name}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="font-medium text-gray-900">${activity.total_amount}</p>
      <p className="text-sm text-gray-500">{new Date(activity.date_performed).toLocaleDateString()}</p>
    </div>
  </div>
)

const App = () => {
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const { user } = useAuth()

  const [analyticsData, setAnalyticsData] = useState(null)
  const [performanceChart, setPerformanceChart] = useState(null)
  const [trendsChart, setTrendsChart] = useState(null)

  useEffect(() => {
    fetchDashboardData()
    fetchAnalyticsData()
  }, [])

  const fetchAnalyticsData = async () => {
    try {
      const [insightsResponse, performanceResponse, trendsResponse] = await Promise.all([
        api.get("/analytics/insights"),
        api.get("/analytics/performance-chart"),
        api.get("/analytics/trends-chart"),
      ])

      setAnalyticsData(insightsResponse.data)
      setPerformanceChart(performanceResponse.data.chart)
      setTrendsChart(trendsResponse.data.chart)
    } catch (error) {
      console.error("Analytics error:", error)
    }
  }

  const fetchDashboardData = async () => {
    try {
      const response = await api.get("/dashboard/overview")
      setDashboardData(response.data)
    } catch (error) {
      setError("Failed to load dashboard data")
      console.error("Dashboard error:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    )
  }

  if (error) {
    return <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>
  }

  const { overview, recent_activities, earnings_trend, top_performers } = dashboardData

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl text-white p-6"
      >
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.full_name || user?.username}!</h1>
        <p className="text-green-100">Here's what's happening on your farm today.</p>
      </motion.div>

      {/* Python-Powered Insights */}
      {analyticsData && analyticsData.insights && analyticsData.insights.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">AI-Powered Insights</h2>
            <div className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">Python Analytics</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {analyticsData.insights.map((insight, index) => (
              <div
                key={index}
                className="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200"
              >
                <h3 className="font-medium text-gray-900 mb-2">{insight.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                {insight.trend && (
                  <div
                    className={`inline-flex items-center text-xs font-medium ${
                      insight.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    <TrendingUp className={`w-3 h-3 mr-1 ${insight.trend === "down" ? "rotate-180" : ""}`} />
                    {insight.value > 0 ? "+" : ""}
                    {insight.value.toFixed(1)}%
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Activity} title="Total Activities" value={overview?.total_activities || 0} color="blue" />
        <StatCard icon={Clock} title="Pending Activities" value={overview?.pending_activities || 0} color="yellow" />
        <StatCard
          icon={DollarSign}
          title="Total Earnings"
          value={`$${Number.parseFloat(overview?.total_earnings || 0).toFixed(2)}`}
          color="green"
        />
        {user?.role !== "worker" && (
          <StatCard icon={Users} title="Active Users" value={overview?.total_users || 0} color="purple" />
        )}
      </div>

      {/* Python-Generated Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {performanceChart && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Worker Performance Analysis</h2>
                <div className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                  Python Generated
                </div>
              </div>
            </div>
            <div className="p-6">
              <img
                src={`data:image/png;base64,${performanceChart}`}
                alt="Performance Chart"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </motion.div>
        )}

        {trendsChart && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Activity Trends</h2>
                <div className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded">
                  Python Analytics
                </div>
              </div>
            </div>
            <div className="p-6">
              <img
                src={`data:image/png;base64,${trendsChart}`}
                alt="Trends Chart"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200"
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
              <Activity className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className="p-6">
            {recent_activities && recent_activities.length > 0 ? (
              <div className="space-y-2">
                {recent_activities.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No recent activities</p>
            )}
          </div>
        </motion.div>

        {/* Earnings Trend */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200"
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Earnings Trend</h2>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className="p-6">
            {earnings_trend && earnings_trend.length > 0 ? (
              <div className="space-y-4">
                {earnings_trend.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {new Date(item.month).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                      })}
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{
                            width: `${Math.min((item.earnings / Math.max(...earnings_trend.map((e) => e.earnings))) * 100, 100)}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        ${Number.parseFloat(item.earnings).toFixed(0)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No earnings data available</p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Top Performers (Admin/Manager only) */}
      {user?.role !== "worker" && top_performers && top_performers.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200"
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Top Performers</h2>
              <Users className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {top_performers.slice(0, 6).map((worker, index) => (
                <div key={worker.username} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">{worker.full_name.charAt(0)}</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{worker.full_name}</p>
                    <p className="text-sm text-gray-500">{worker.activity_count} activities</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-600">
                      ${Number.parseFloat(worker.total_earnings).toFixed(0)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default App
