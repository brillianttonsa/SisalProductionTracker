import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Calendar, XCircle } from "lucide-react";
import api from "../services/api";
import { ProductionModal } from "../components/ProductionModal";

const Production = () => {
  const [productions, setProductions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchProductions = async () => {
    try {
      setLoading(true);
      const response = await api.get("/productions");
      setProductions(response.data.productions);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductions();
  }, []);

  const registerProduction = async (formData) => {
    try{
        const response = await api.post("/productions", formData);

        setProductions((prev) => [response.data.production, ...prev]);
        
    } catch (err){
        console.error(err);
        setError("Failed to record production");
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this production?")) return;
    try {
      await api.delete(`/productions/${id}`);
      setProductions((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete production");
    }
  };

  return (
    <div className="space-y-6">
      <div className="">
        <h1 className="text-2xl font-bold">Production Page</h1>
        {error && (
          <p className="text-red-500 bg-red-100 px-2 rounded mt-2">{error}</p>
        )}

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ProductionModal onSubmit={registerProduction}/>

        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:col-span-2">
                <div className="p-6 rounded-lg shadow-md bg-white">
                    <h3 className="text-lg font-semibold mb-4">Production Records</h3> 

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Batch
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Farm
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Quality/Amount
                                    </th>
                                
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Description
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Supervisor
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="py-12">
                                            <div className="flex items-center justify-center">
                                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
                                            </div>
                                        </td>
                                    </tr>
                                ) : productions.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="py-12 text-center">
                                            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">No Production found</h3>
                                            <p className="text-gray-500">Get started by adding your first production.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    productions.map((prod) => (
                                        <tr key={prod.id}>
                                            <td className="px-4 py-4">{prod.productionDate}</td>
                                            <td className="px-4 py-4">{prod.farmName}</td>
                                            <td className="px-4 py-4">{prod.gradedOutput?.map((g, idx) => (
                                                <div key={idx} className="text-sm">
                                                    {g.grade}: {g.numberOfBales} bales ({g.baleWeight}kg each)
                                                </div>
                                            ))}</td>
                                               

                                            <td className="px-4 py-4">{prod.productionNotes}</td>
                                            <td className="px-4 py-4">{prod.supervisor_name}</td>
                                        </tr>
                                    ))
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

export default Production;
