import { motion } from "framer-motion"
import { Menu } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"

export const Header = ({onMenuClick}) => {
    const { user } = useAuth()

    return(
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white shadow-sm border-b border-gray-200 px-6 py-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={onMenuClick} className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden">
                <Menu className="w-6 h-6 text-gray-600" />
              </button>

            </div>
    
            <div className="flex items-center space-x-4">
    
              <div className="flex items-center space-x-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-800">{user?.full_name || user?.username || "Abdullatif Mnyamisi"}</p>
                </div>
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {user?.full_name?.charAt(0) || user?.username?.charAt(0) || "A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.header>
    )
}