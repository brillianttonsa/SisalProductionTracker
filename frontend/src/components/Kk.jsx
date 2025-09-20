"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const ProductionJ = () => {
  const [formData, setFormData] = useState({
    productionDate: "",
    farmName: "",
    supervisorName: "",
    metaTons: "",
    shift: "",
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
  })


  return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Form */}
        <section className="h-screen flex flex-col items-center justify-center bg-gray-100">
  <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
    Meet the SmartWatch 3000
  </motion.h1>
  <motion.img src="data:image/jpeg;base64,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" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5 }} />
  <motion.button whileHover={{ scale: 1.1 }} className="mt-6 bg-blue-500 text-white px-6 py-3 rounded">
    Buy Now
  </motion.button>
</section>


        
      </div>
  )
}

export default ProductionJ
