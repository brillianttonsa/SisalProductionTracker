import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import api from "../services/api";
import { SalesModal } from "../components/SalesModal";

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchSales = async () => {
    try {
      setLoading(true);
      const response = await api.get("/sales");
      setSales(response.data.sales);
    } catch (err) {
      console.error(err);
      setError("Failed to load sales");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const registerSale = async (formData) => {
    try {
      const response = await api.post("/sales", formData);
      setSales((prev) => [response.data.sale, ...prev]);
    } catch (err) {
      console.error(err);
      setError("Failed to record sale");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Sales Page</h1>
        {error && (
          <p className="text-red-500 bg-red-100 px-2 rounded mt-2">{error}</p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SalesModal onSubmit={registerSale} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lg:col-span-2"
        >
          <div className="p-6 rounded-lg shadow-md bg-white">
            <h3 className="text-lg font-semibold mb-4">Sales Records</h3>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Buyer
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Grade
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Bales
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Weight (kg)
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Price/Ton
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Total Value
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
  {loading ? (
    <tr>
      <td colSpan="7" className="py-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
      </td>
    </tr>
  ) : sales.length === 0 ? (
    <tr>
      <td colSpan="7" className="py-12 text-center">
        <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Sales found</h3>
        <p className="text-gray-500">Get started by recording your first sale.</p>
      </td>
    </tr>
  ) : (
    sales.map((sale) => {
      const totalWeight = sale.numberOfBales * (sale.baleWeight || 0); // in kg
      const totalValue = (totalWeight / 1000) * sale.pricePerTon;      // price per ton
      return (
        <tr key={sale.id}>
          <td className="px-4 py-4">{sale.saleDate}</td>
          <td className="px-4 py-4">{sale.buyerName}</td>
          <td className="px-4 py-4">{sale.fibreGrade}</td>
          <td className="px-4 py-4">{sale.numberOfBales}</td>
          <td className="px-4 py-4">{totalWeight.toFixed(2)}</td>
          <td className="px-4 py-4">{sale.pricePerTon}</td>
          <td className="px-4 py-4 font-semibold text-green-600">{totalValue.toFixed(2)}</td>
        </tr>
      );
    })
  )}
</tbody>

              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Sales;
