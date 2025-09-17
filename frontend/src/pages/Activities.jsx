import { Edit, XCircle, Plus, Search, Calendar } from "lucide-react"
import { useEffect, useState } from "react"
import { ActivityModal } from "../components/ActivityModal"
import { motion, AnimatePresence } from "framer-motion"
import TableHeader from "../components/TableHeader"
import { EditActivityModal } from "../components/EditActivityModal"
import api from "../services/api"

const Activities = () => {
    const [showModal, setShowModal] = useState(false)
    const [activities, setActivities] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [filters, setFilters] = useState({
        activity_type: "",
        search: "",
    })
    const [editModal, setEditModal] = useState({ open: false, activity: null })

    const handleFilterChange = (key,value) => {
        setFilters((prev) => ({ ...prev, [key]: value}))
        
    }

    const fetchActivities = async () => {
        try {
            setLoading(true)
            const response = await api.get("/activities")
            const data = response.data.activities ?? response.data ?? []
            setActivities(data)
        } catch (error) {
            setError("Failed to load activities")
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchActivities()
    },[]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this activity?")) return;
      
        try {
          await api.delete(`/activities/${id}`);
          // Remove the deleted activity from state
          setActivities(prev => prev.filter(a => a.id !== id));
        } catch (err) {
          console.error("Error deleting activity:", err);
          alert("Failed to delete activity");
        }
    };


    //apply filters
    const filteredActivities = activities.filter(activity => {
        const matchesSearch = filters.search === "" || activity.farm_name?.toLowerCase().includes(filters.search.toLowerCase()) ||
        activity.supervisor_name?.toLowerCase().includes(filters.search.toLowerCase())

        const matchesType = filters.activity_type === "" || activity.activity_type === filters.activity_type

        return matchesSearch && matchesType
    })

    


    return(
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                <h1 className="text-2xl font-bold text-gray-900">Activities</h1>
                <p className="text-gray-600 mt-1">Manage and track farm activities</p>
                </div>
                <button
                onClick={() => setShowModal(true)}
                className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                <Plus className="w-5 h-5 mr-2" />
                Add Activity
                </button>
            </div>

            {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>}

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                        <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            value={filters.search}
                            onChange={(e) => handleFilterChange("search", e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="Search activities..."
                        />
                        </div>
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Activity Type</label>
                        <select
                        value={filters.activity_type}
                        onChange={(e) => handleFilterChange("activity_type", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                        <option value="">All Types</option>
                        <option value="harvesting">Harvesting</option>
                        <option value="processing">Processing</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="planting">Planting</option>
                    
                        <option value="pre_planting">Pre-Planting</option>
                        </select>
                    </div>
                    {/* clear filters */}
                    <div className="flex items-end">
                        <button
                        onClick={() => {
                            setFilters({ activity_type: "", search: "" })
                            
                        }}
                        className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                        Clear Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* Activities List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                {loading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
                </div>
                ) : activities.length === 0 ? (
                <div className="text-center py-12">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No activities found</h3>
                    <p className="text-gray-500">Get started by adding your first activity.</p>
                </div>
                ) : (
                <>
                    <div className="overflow-x-auto">
                    <table className="w-full">
                        <TableHeader/>
                        <tbody className="bg-white divide-y divide-gray-200">
                        <AnimatePresence>
                            {filteredActivities.map((activity) => (
                            <motion.tr
                                key={activity.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="hover:bg-gray-50"
                            >
                                <td className="px-6 py-4 whitespace-nowrap">
                                <div>
                                    <div className="text-sm font-medium text-gray-900 capitalize">{activity.farm_name}</div>
                                </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{activity.activity_type}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{activity.description}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                    {activity.supervisor_name} 
                                </div>
                                
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">
                                        {activity.area_covered}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">
                                        {activity.money_spent}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">
                                        {activity.duration}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(activity.date_performed).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex items-center space-x-2">
                                

                                    <button
                                        onClick={() => handleDelete(activity.id)}
                                        className="text-red-600 hover:text-red-900 p-1 rounded"
                                        title="Reject"
                                    >
                                        <XCircle className="w-4 h-4" />
                                    </button>
                                
                                
                                    <button
                                    onClick={() => setEditModal({ open: true, activity })}
                                    className="text-blue-600 hover:text-blue-900 p-1 rounded"
                                    title="Edit"
                                    >
                                    <Edit className="w-4 h-4" />
                                    </button>
                                    
                                </div>
                                </td>
                            </motion.tr>
                            ))}
                        </AnimatePresence>
                        </tbody>
                    </table>
                    </div>
                </>               
                )}
            </div>

            <AnimatePresence>
                {showModal && (
                    <ActivityModal 
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}/>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {editModal.open && (
                    <EditActivityModal
                        isOpen={editModal.open}
                        onClose={() => setEditModal({ open: false, activity: null })}
                        activity={editModal.activity}
                        onUpdated={(updated) => {
                            setActivities(prev =>
                            prev.map(a => (a.id === updated.id ? updated : a))
                            )
                        }}
                    />
                )}
            </AnimatePresence>

        </div>
    )
}

export default Activities