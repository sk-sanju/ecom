import { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { Plus, Loader2, Edit, Trash2, X } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { API_URL } from "../../config/api";

const AdminOffers = () => {
  const { token } = useAuth();
  const [offers, setOffers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentOfferId, setCurrentOfferId] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    link: "/shop",
    images: ["", "", "", ""]
  });
  const [isSaving, setIsSaving] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/api/offers`);
      const data = await res.json();
      setOffers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch offers:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (offer?: any) => {
    if (offer) {
      setIsEditing(true);
      setCurrentOfferId(offer.id);
      setFormData({
        title: offer.title,
        link: offer.link,
        images: Array.isArray(offer.images) ? offer.images : ["", "", "", ""]
      });
    } else {
      setIsEditing(false);
      setCurrentOfferId(null);
      setFormData({
        title: "",
        link: "/shop",
        images: ["", "", "", ""]
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const url = isEditing 
        ? `${API_URL}/api/offers/${currentOfferId}` 
        : `${API_URL}/api/offers`;
        
      const method = isEditing ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      if (!res.ok) throw new Error("Failed to save offer");
      
      await fetchData();
      closeModal();
    } catch (err) {
      console.error("Error saving offer:", err);
      alert("Failed to save offer");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this offer card?")) return;
    
    try {
      const res = await fetch(`${API_URL}/api/offers/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      
      if (!res.ok) throw new Error("Failed to delete");
      
      await fetchData();
    } catch (err) {
      console.error("Error deleting offer:", err);
      alert("Failed to delete offer");
    }
  };

  return (
    <AdminLayout title="Manage Offers">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="relative w-full sm:w-64">
            {/* Search not implemented for brevity */}
          </div>
          <button 
            onClick={() => openModal()}
            className="bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded-lg flex items-center transition-colors w-full sm:w-auto justify-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Offer Card
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 text-accent animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((offer) => (
              <div key={offer.id} className="border border-gray-200 rounded-xl p-4 flex flex-col">
                <h3 className="font-bold text-lg mb-2">{offer.title}</h3>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {offer.images && offer.images.map((img: string, idx: number) => (
                    <div key={idx} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      {img ? (
                        <img src={img} alt={`Img ${idx}`} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No img</div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-auto flex justify-between items-center pt-2 border-t border-gray-100">
                  <a href={offer.link} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline">Link</a>
                  <div className="flex gap-2">
                    <button onClick={() => openModal(offer)} className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleDelete(offer.id)} className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {offers.length === 0 && (
              <div className="col-span-full py-12 text-center text-gray-500">
                No offer cards found. Click "Add Offer Card" to create one.
              </div>
            )}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold">{isEditing ? "Edit Offer Card" : "Add New Offer Card"}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                  placeholder="e.g. Up to 60% off | Appliances"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Link URL</label>
                <input
                  type="text"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                  placeholder="/shop"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[0, 1, 2, 3].map((index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL {index + 1}</label>
                    <input
                      type="url"
                      value={formData.images[index]}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                ))}
              </div>
              
              <div className="flex justify-end pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 mr-3"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2 bg-accent hover:bg-accent-dark text-white rounded-lg flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSaving ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                  {isSaving ? "Saving..." : "Save Offer Card"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminOffers;
