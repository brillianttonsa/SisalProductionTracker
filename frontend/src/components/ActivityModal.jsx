import { useState } from "react"
import { motion } from "framer-motion"

const activity = false;

export const ActivityModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null 


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
        dynamicFields: {}
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleDynamicChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
        ...prev,
        dynamicFields: { ...prev.dynamicFields, [name]: value }
        }))
    }

    const handleActivityTypeChange = (e) => {
        const selectedType = e.target.value
        setFormData(prev => ({ 
            ...prev,
            activity_type: selectedType,
            dynamicFields: {} // clear the dynamic fields
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        // backend logic later
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
                {activity ? "Edit Activity" : "Add Sisal Activity"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Activity Type */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Activity Type</label>
                <select
                    value={formData.activity_type}
                    onChange={handleActivityTypeChange}
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

                {/* Workers & Duration */}
                <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Number of Workers</label>
                    <input
                    type="number"
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
                    step="0.01"
                    name="money_spent"
                    value={formData.money_spent}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                    />
                </div>
                </div>

                {/* Description */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description (option)</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    rows="3"
                    placeholder="Describe the activity..."
                />
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

                {/* Dynamic Fields Per Activity Type */}
                {formData.activity_type === "pre-planting" && (
                <input
                    type="text"
                    name="pre_planting_activity"
                    placeholder="Pre-Planting Activity"
                    value={formData.dynamicFields.pre_planting_activity || ""}
                    onChange={handleDynamicChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                />
                )}

                {formData.activity_type === "planting" && (
                <>
                    <input
                    type="number"
                    name="seedlings_count"
                    placeholder="Seedlings Count"
                    value={formData.dynamicFields.seedlings_count || ""}
                    onChange={handleDynamicChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent mb-2"
                    required
                    />
                    <input
                    type="text"
                    name="seedling_type"
                    placeholder="Seedling Type (option)"
                    value={formData.dynamicFields.seedling_type || ""}
                    onChange={handleDynamicChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                </>
                )}

                {formData.activity_type === "maintenance" && (
                <input
                    type="text"
                    name="maintenance_activity"
                    placeholder="Maintenance Activity (e.g. irrigation)"
                    value={formData.dynamicFields.maintenance_activity || ""}
                    onChange={handleDynamicChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                />
                )}

                {formData.activity_type === "harvesting" && (
                <>
                    <input
                    type="number"
                    name="leaves_harvested"
                    placeholder="Leaves Harvested"
                    value={formData.dynamicFields.leaves_harvested || ""}
                    onChange={handleDynamicChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent mb-2"
                    required
                    />

                    <input
                    type="number"
                    name="waste_byproduct"
                    placeholder="Waste / Byproduct (kg) (option)"
                    value={formData.dynamicFields.waste_byproduct || ""}
                    onChange={handleDynamicChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                </>
                )}

                {formData.activity_type === "processing" && (
                <>
                    <input
                    type="number"
                    name="leaves_processed"
                    placeholder="Leaves Processed"
                    value={formData.dynamicFields.leaves_processed || ""}
                    onChange={handleDynamicChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent mb-2"
                    />
                    <input
                    type="number"
                    name="fiber_extracted"
                    placeholder="Fiber Extracted (kg)"
                    value={formData.dynamicFields.fiber_extracted || ""}
                    onChange={handleDynamicChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent mb-2"
                    />
                </>
                )}

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
                    className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg transition-colors"
                >
                    {activity ? "Update" : "Create"} Activity
                </button>
                </div>

            </form>
            </div>
        </motion.div>
        </div>
    )
}
