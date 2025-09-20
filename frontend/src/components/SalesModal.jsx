import { motion } from "framer-motion";
import { useState } from "react";

export const SalesModal = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    saleDate: "",
    buyerName: "",
    fibreGrade: "",
    numberOfBales: "",
    baleWeight: "",
    pricePerTon: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      saleDate: "",
      buyerName: "",
      fibreGrade: "",
      numberOfBales: "",
      baleWeight: "",
      pricePerTon: "",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white rounded-xl shadow-xl w-full lg:grid-col-1 lg:h-[700px]"
    >
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">Record Sisal Sale</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Sale Date</label>
            <input
              type="date"
              name="saleDate"
              value={formData.saleDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Buyer Name</label>
            <input
              type="text"
              name="buyerName"
              value={formData.buyerName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Fibre Grade</label>
            <input
              type="text"
              name="fibreGrade"
              value={formData.fibreGrade}
              onChange={handleChange}
              placeholder="e.g. UG, SSUG"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              name="numberOfBales"
              placeholder="Number of Bales"
              value={formData.numberOfBales}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="number"
              step="0.01"
              name="baleWeight"
              placeholder="Bale Weight (kg)"
              value={formData.baleWeight}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Price per Ton</label>
            <input
              type="number"
              step="0.01"
              name="pricePerTon"
              placeholder="Price per Ton"
              value={formData.pricePerTon}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500"
          >
            Record Sale
          </button>
        </form>
      </div>
    </motion.div>
  );
};
