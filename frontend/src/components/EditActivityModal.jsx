import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import api from "../services/api"

export const EditActivityModal = ({ isOpen, onClose, activity, onUpdated }) => {
    const [formData, setFormData] = useState({
      farm_name: "",
      activity_type: "",
      description: "",
      supervisor_name: "",
      area_covered: "",
      number_of_workers: "",
      money_spent: "",
      duration: "",
      date_performed: "",
    })

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    // Prefill form when activity changes
    useEffect(() => {
      if (activity) {
        setFormData({
          farm_name: activity.farm_name || "",
          activity_type: activity.activity_type || "",
          description: activity.description || "",
          supervisor_name: activity.supervisor_name || "",
          area_covered: activity.area_covered || "",
          money_spent: activity.money_spent || "",
          number_of_workers:activity.number_of_workers || "",
          duration: activity.duration || "",
          date_performed: activity.date_performed?.split("T")[0] ,
        })
      }
    }, [activity])

    const handleChange = (e) => {
      const { name, value } = e.target
      setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
      e.preventDefault()
      setIsLoading(true)
      setError("")
      console.log(activity);
      console.log(activity.id);

      try {
        const response = await api.put(`/activities/${activity.id}`, formData)
        console.log("Response:", response.data)
        onUpdated(response.data.activity) // update parent state
        onClose()
      } catch (err) {
        console.error("Update error:", err.response?.data || err.message)
        setError("Failed to update activity", err)
      } finally {
        setIsLoading(false)
      }
    }

    if (!isOpen) return null

    return (
      <div
        
        className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 "
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
        >
          <h2 className="text-xl font-bold mb-4">Edit Activity</h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Farm Name</label>
              <input
                type="text"
                name="farm_name"
                value={formData.farm_name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Activity Type</label>
              <select
                name="activity_type"
                value={formData.activity_type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              >
                <option value="">Select Type</option>
                <option value="harvesting">Harvesting</option>
                <option value="processing">Processing</option>
                <option value="maintenance">Maintenance</option>
                <option value="planting">Planting</option>
                <option value="pre_planting">Pre-Planting</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Supervisor Name</label>
              <input
                type="text"
                name="supervisor_name"
                value={formData.supervisor_name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Area Covered</label>
                <input
                  type="text"
                  name="area_covered"
                  value={formData.area_covered}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Money Spent</label>
                <input
                  type="number"
                  name="money_spent"
                  value={formData.money_spent}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Workers</label>
                <input
                  type="text"
                  name="number_of_workers"
                  value={formData.number_of_workers}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Performed</label>
                <input
                  type="date"
                  name="date_performed"
                  value={formData.date_performed}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

            <div className="flex justify-end space-x-2 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Updating..." : "Update Activity"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    )
}
