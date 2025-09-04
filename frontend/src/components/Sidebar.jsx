import { motion, AnimatePresence } from "framer-motion"
import { NavLink } from "react-router-dom"
import { Home, Activity, FileText, Settings, LogOut, Leaf, ChevronLeft, Warehouse, ChartArea, Factory, ShoppingCart } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"


const Sidebar = ({ isOpen, onToggle }) => {
  const { user, logout } = useAuth()
  // let isOpen = true

const menuItems = [
  { icon: Home, label: "Dashboard", path: "/dashboard" },
  { icon: Activity, label: "Activities", path: "/activities" },
  { icon: ShoppingCart, label: "Sales", path: "/sales"},
  { icon: Factory, label: "Production", path: "/production" },
  { icon: Warehouse, label: "Inventory", path: "/inventory" },
  { icon: ChartArea, label: "Analytics", path: "/analytics" },
  { icon: FileText, label: "Reports", path: "/reports" },
  { icon: Settings, label: "Settings", path: "/settings"},
]

  const sidebarVariants = {
    open: { x: 0, width: "16rem" },
    closed: { x: "-100%", width: "16rem" },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={sidebarVariants}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-y-0 left-0 z-50 bg-white shadow-xl border-r border-gray-200 lg:relative lg:translate-x-0"
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg">
                  <Leaf className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-800">SisalTrack</h1>
                  <p className="text-xs text-gray-500">Pro</p>
                </div>
              </div>
              <button onClick={onToggle} className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden">
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* User Info */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {user?.full_name?.charAt(0) || user?.username?.charAt(0) || "A"}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">{user?.full_name || user?.username || "Abdullatif Mnayimisi"}</p>

                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-green-50 text-green-700 border-r-2 border-green-500"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                    }`
                  }
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                  {item.label === "Python Demo" && (
                    <span className="ml-auto px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">New</span>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={logout}
                className="flex items-center space-x-3 w-full px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Sidebar
