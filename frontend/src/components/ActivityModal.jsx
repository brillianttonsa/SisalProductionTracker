import { useState } from "react"
import { motion } from "framer-motion"
import api from "../services/api";

export const ActivityModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null 

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [formData, setFormData] = useState({
        farm_name: "",
        activity_type: "",
        description: "",
        duration: "",
        number_of_workers: "",
        money_spent: "",
        area_covered: "",
        supervisor_name: "",
        date_performed: new Date().toISOString().split("T")[0],
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(formData)
        setLoading(true)
        setError("")
        // backend logic later
        try {
            
            const res = await api.post("/activities", formData)
            console.log("Created:", res.data)
            
            onClose()
        } catch (err) {
            setError(err)
            console.error("Error creating activity:", err)
        }
    }

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4">
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        >
            <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Add Sisal Activity
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {error && (<p className="text-red-400">{error}</p>)}

                {/* Activity Type */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Activity Type</label>
                <select
                    name="activity_type"
                    value={formData.activity_type}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                >
                    <option value="">Select activity type</option>
                    <option value="pre-planting">Pre-Planting</option>
                    <option value="planting">Planting</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="harvesting">Harvesting</option>
                    <option value="processing">Processing</option>
                </select>
                </div>

                {/* Farm Name */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Farm Name</label>
                <input
                    type="text"
                    name="farm_name"
                    value={formData.farm_name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                />
                </div>

                {/* Supervisor Name */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Supervisor Name</label>
                <input
                    type="text"
                    name="supervisor_name"
                    value={formData.supervisor_name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        rows="3"
                        placeholder="Describe the activity..."
                    />
                </div>

                {/* Workers & Duration */}
                <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Number of Workers</label>
                    <input
                    type="number"
                    min = "1"
                    name="number_of_workers"
                    value={formData.number_of_workers}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration (Days)</label>
                    <input
                    type="number"
                    min={"1"}
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                    />
                </div>
                </div>

                {/* Area & Money */}
                <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Area Covered (acres)</label>
                    <input
                    type="number"
                    min={"0"}
                    step="0.01"
                    name="area_covered"
                    value={formData.area_covered}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Money Spent (/=)</label>
                    <input
                    type="number"
                    min={"0"}
                    step="0.01"
                    name="money_spent"
                    value={formData.money_spent}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                    />
                </div>
                </div>

                {/* Date Performed */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Performed</label>
                <input
                    type="date"
                    name="date_performed"
                    value={formData.date_performed}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                />
                </div>

                {/* Submit / Cancel */}
                <div className="flex justify-end space-x-3 pt-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className={`px-4 py-2 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"} text-white rounded-lg transition-colors`}

                >
                  {loading ? "Creating Activity...":"Create  Activity"}
                </button>
                </div>

            </form>
            </div>
        </motion.div>
        </div>
    )
}
