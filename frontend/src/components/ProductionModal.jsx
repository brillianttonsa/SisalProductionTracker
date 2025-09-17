import { motion } from "framer-motion"
import { useState } from "react"

export const ProductionModal = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        productionDate: "",
        farmName: "",
        supervisorName: "",
        productionNotes: "",
        gradedOutput: [
          { 
            grade: "UG",
            baleWeight: "", 
            numberOfBales: "0" 
          },
          { 
            grade: "SSUG", 
            baleWeight: "", 
            numberOfBales: "0" 
          },{
            grade: "Others",
            baleWeight: "",
            numberOfBales: ""
          }
        ],
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleGradedChange = (index, field, value) => {
        const updated = [...formData.gradedOutput]
        updated[index][field] = value
        setFormData((prev) => ({ ...prev, gradedOutput: updated }))
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(formData)
    }


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white rounded-xl shadow-xl w-full lg:grid-col-1"
    >
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">Record Sisal Production</h3>

        <form onSubmit={handleSubmit} className="space-y-4">

            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Production Date</label>
                <input
                  type="date"
                  name="productionDate"
                  value={formData.productionDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Farm Name</label>
                <input
                  type="text"
                  name="farmName"
                  value={formData.farmName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Supervisor Name</label>
                <input
                  type="text"
                  name="supervisorName"
                  value={formData.supervisorName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
            </div>

            {/* Graded Output */}
            <div className="mb-4">
                <h4 className="text-md font-semibold mb-2">Graded Output</h4>
                
                {formData.gradedOutput.map((grade, index) => (
                  <div key={index} className="mb-2 p-3 border border-gray-400 rounded-lg">
                    <div className="font-medium">{grade.grade}</div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <input
                        type="number"
                        placeholder="Bale Weight (kg)"
                        value={grade.baleWeight}
                        onChange={(e) => handleGradedChange(index, "baleWeight", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        required
                      />
                      <input
                        type="number"
                        placeholder="Number of Bales"
                        value={grade.numberOfBales}
                        onChange={(e) => handleGradedChange(index, "numberOfBales", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg  focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                  </div>
                ))}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Production Notes</label>
                <textarea
                  name="productionNotes"
                  value={formData.productionNotes}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500"
              >
                Record Production
              </button>
        </form>
      </div>
    </motion.div>
  )
}
