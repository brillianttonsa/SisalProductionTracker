import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { reportsAPI } from "../services/api"
import { useAuth } from "../contexts/AuthContext"
import { MapPin, Scissors, ShoppingCart, DollarSign, TrendingUp, AlertCircle, Package, Calendar } from "lucide-react"
import LoadingSpinner from "../components/LoadingSpinner"

const Dashboard = () => {
  const { user } = useAuth()
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await reportsAPI.getDashboard()
        setDashboardData(response.data)
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  const { summary, inventory } = dashboardData || {}

  const stats = [
    {
      name: "Total Fields",
      value: summary?.total_fields || 0,
      icon: MapPin,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      href: "/fields",
    },
    {
      name: "Total Harvests",
      value: summary?.total_harvests || 0,
      icon: Scissors,
      color: "text-green-600",
      bgColor: "bg-green-100",
      href: "/harvests",
    },
    {
      name: "Total Sales",
      value: summary?.total_sales || 0,
      icon: ShoppingCart,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      href: "/sales",
    },
    {
      name: "Outstanding Payments",
      value: `TSh ${(summary?.outstanding_payments || 0).toLocaleString()}`,
      icon: AlertCircle,
      color: "text-red-600",
      bgColor: "bg-red-100",
      href: "/sales",
    },
  ]

  const monthlyStats = [
    {
      name: "This Month's Harvest",
      value: `${(summary?.current_month_harvest || 0).toFixed(1)} kg`,
      icon: Scissors,
      color: "text-green-600",
    },
    {
      name: "This Month's Sales",
      value: `TSh ${(summary?.current_month_sales_value || 0).toLocaleString()}`,
      icon: DollarSign,
      color: "text-blue-600",
    },
    {
      name: "This Month's Costs",
      value: `TSh ${(summary?.current_month_costs || 0).toLocaleString()}`,
      icon: TrendingUp,
      color: "text-red-600",
    },
    {
      name: "Net Profit",
      value: `TSh ${(summary?.net_profit_current_month || 0).toLocaleString()}`,
      icon: TrendingUp,
      color: summary?.net_profit_current_month >= 0 ? "text-green-600" : "text-red-600",
    },
  ]

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-800 to-purple-600 rounded-lg p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user?.full_name?.split(" ")[0]}!</h1>
            <p className="text-purple-100 mt-1">
              {user?.farm_name ? `Managing ${user.farm_name}` : "Ready to manage your sisal farm"}
            </p>
            <p className="text-purple-200 text-sm mt-2">Empowering Your Farm, One Click at a Time</p>
          </div>
          <div className="hidden sm:block">
            <Calendar className="h-12 w-12 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link
              key={stat.name}
              to={stat.href}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Monthly Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">This Month's Performance</h3>
          <div className="space-y-4">
            {monthlyStats.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.name} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Icon className={`h-5 w-5 ${stat.color} mr-3`} />
                    <span className="text-sm text-gray-600">{stat.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{stat.value}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Inventory Summary */}
        <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Inventory</h3>
          {inventory && inventory.length > 0 ? (
            <div className="space-y-3">
              {inventory.map((item) => (
                <div key={item.fiber_grade} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Package className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-sm text-gray-600">{item.fiber_grade} Grade</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {Number.parseFloat(item.total_quantity).toFixed(1)} kg
                  </span>
                </div>
              ))}
              <div className="pt-3 border-t border-gray-200">
                <Link to="/processing" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                  View full inventory →
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <Package className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500">No inventory data available</p>
              <Link to="/processing" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                Start processing →
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/fields"
            className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg text-center font-medium hover:bg-purple-200 transition-colors"
          >
            Add New Field
          </Link>
          <Link
            to="/harvests"
            className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg text-center font-medium hover:bg-purple-200 transition-colors"
          >
            Record Harvest
          </Link>
          <Link
            to="/processing"
            className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg text-center font-medium hover:bg-purple-200 transition-colors"
          >
            Log Processing
          </Link>
          <Link
            to="/sales"
            className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg text-center font-medium hover:bg-purple-200 transition-colors"
          >
            Record Sale
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
