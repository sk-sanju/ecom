import { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Package, User, MapPin, Loader2, X, CheckCircle2, Truck, Box, FileText } from "lucide-react";

const Profile = () => {
  const { user, token, updateUser } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal states
  const [activeModal, setActiveModal] = useState<'LOGIN' | 'ADDRESS' | 'TRACK' | 'INVOICE' | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  
  // Form states
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    password: "",
  });

  const [addressData, setAddressData] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "India"
  });

  const ordersRef = useRef<HTMLDivElement>(null);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/orders", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch user orders:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, [token]);

  // Update local form state when user context changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      name: user?.name || ""
    }));

    if (user?.address) {
      try {
        const parsed = JSON.parse(user.address);
        setAddressData({
          street: parsed.street || "",
          city: parsed.city || "",
          state: parsed.state || "",
          zip: parsed.zip || "",
          country: parsed.country || "India"
        });
      } catch (e) {
        setAddressData(prev => ({ ...prev, street: user.address || "" }));
      }
    }
  }, [user]);

  const scrollToOrders = () => {
    ordersRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const payload: any = {};
      if (activeModal === 'LOGIN') {
        if (formData.name) payload.name = formData.name;
        if (formData.password) payload.password = formData.password;
      } else if (activeModal === 'ADDRESS') {
        payload.address = JSON.stringify(addressData);
      }

      const res = await fetch("http://localhost:5000/api/auth/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Update failed");
      const updatedUser = await res.json();
      
      updateUser({
        name: updatedUser.name,
        address: updatedUser.address
      });
      
      setActiveModal(null);
      setFormData(prev => ({ ...prev, password: "" })); // Clear password
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const openTrackModal = (order: any) => {
    setSelectedOrder(order);
    setActiveModal('TRACK');
  };

  const openInvoiceModal = (order: any) => {
    setSelectedOrder(order);
    setActiveModal('INVOICE');
  };

  // Helper for tracking timeline
  const getTrackingStep = (status: string) => {
    const steps = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED'];
    return steps.indexOf(status);
  };

  return (
    <div className="min-h-screen bg-light py-8 relative">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Account</h1>
            <p className="text-gray-500 mt-1">Manage your orders, security, and preferences</p>
          </div>
          <div className="bg-white px-6 py-3 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent font-bold text-xl">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-bold text-gray-900 text-lg leading-tight">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
              {user.role === 'ADMIN' && (
                <span className="inline-block mt-1 px-2 py-0.5 bg-secondary text-gray-900 text-xs font-bold rounded">ADMIN</span>
              )}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Action Cards */}
          <div 
            onClick={scrollToOrders}
            className="bg-white p-6 border border-gray-200 rounded-2xl shadow-sm flex items-start gap-4 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <Package className="w-8 h-8 text-accent" />
            <div>
              <h3 className="font-bold text-gray-900">Your Orders</h3>
              <p className="text-sm text-gray-500">Track, return, or buy things again</p>
            </div>
          </div>
          
          <div 
            onClick={() => setActiveModal('LOGIN')}
            className="bg-white p-6 border border-gray-200 rounded-2xl shadow-sm flex items-start gap-4 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <User className="w-8 h-8 text-accent" />
            <div>
              <h3 className="font-bold text-gray-900">Login & Security</h3>
              <p className="text-sm text-gray-500">Edit login, name, and password</p>
            </div>
          </div>
          
          <div 
            onClick={() => setActiveModal('ADDRESS')}
            className="bg-white p-6 border border-gray-200 rounded-2xl shadow-sm flex items-start gap-4 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <MapPin className="w-8 h-8 text-accent" />
            <div>
              <h3 className="font-bold text-gray-900">Your Addresses</h3>
              <p className="text-sm text-gray-500">Edit addresses for orders and gifts</p>
            </div>
          </div>
        </div>

        {/* Order History */}
        <div ref={ordersRef}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Order History</h2>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 text-accent animate-spin" />
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-white p-8 border border-gray-200 rounded-lg text-center">
              <p className="text-gray-500">You haven't placed any orders yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="bg-gray-100 px-6 py-4 border-b border-gray-200 flex flex-wrap gap-6 text-sm text-gray-600">
                    <div>
                      <p className="uppercase text-xs font-bold mb-1">Order Placed</p>
                      <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="uppercase text-xs font-bold mb-1">Total</p>
                      <p>₹{order.totalAmount}</p>
                    </div>
                    <div>
                      <p className="uppercase text-xs font-bold mb-1">Dispatch To</p>
                      <p className="text-blue-600 cursor-pointer hover:underline" onClick={() => setActiveModal('ADDRESS')}>
                        {user.name}
                      </p>
                    </div>
                    <div className="flex-1 text-right">
                      <p className="uppercase text-xs font-bold mb-1">Order #</p>
                      <p>{order.id}</p>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h3 className={`font-bold text-lg mb-2 ${order.status === 'DELIVERED' ? 'text-green-700' : 'text-yellow-600'}`}>
                        {order.status}
                      </h3>
                      <p className="text-sm text-gray-900 font-medium mb-1">Payment: {order.paymentMethod.replace(/_/g, ' ')}</p>
                    </div>
                    <div className="flex flex-col gap-2 w-full md:w-auto">
                      <button 
                        onClick={() => openTrackModal(order)}
                        className="px-4 py-2 bg-secondary hover:bg-yellow-400 text-gray-900 text-sm font-bold rounded-lg shadow-sm border border-yellow-500 transition-colors w-full"
                      >
                        Track Package
                      </button>
                      <button 
                        onClick={() => openInvoiceModal(order)}
                        className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-900 text-sm font-bold rounded-2xl shadow-sm border border-gray-300 transition-colors w-full flex items-center justify-center gap-2"
                      >
                        <FileText className="w-4 h-4" />
                        View Invoice
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MODALS */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">
            
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900">
                {activeModal === 'LOGIN' && 'Login & Security'}
                {activeModal === 'ADDRESS' && 'Your Addresses'}
                {activeModal === 'TRACK' && 'Track Package'}
                {activeModal === 'INVOICE' && 'Order Invoice'}
              </h2>
              <button 
                onClick={() => setActiveModal(null)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              
              {/* Login & Security Modal */}
              {activeModal === 'LOGIN' && (
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">New Password</label>
                    <input 
                      type="password" 
                      name="password" 
                      value={formData.password} 
                      onChange={handleInputChange} 
                      placeholder="Leave blank to keep current"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent outline-none"
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={isSaving}
                    className="w-full py-2.5 mt-4 bg-accent hover:bg-orange-600 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save Changes'}
                  </button>
                </form>
              )}

              {/* Address Modal */}
              {activeModal === 'ADDRESS' && (
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Street Address</label>
                    <input 
                      type="text"
                      name="street" 
                      value={addressData.street} 
                      onChange={handleAddressChange} 
                      required
                      placeholder="Flat, House no., Building, Company, Apartment"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent outline-none"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">City</label>
                      <input 
                        type="text"
                        name="city" 
                        value={addressData.city} 
                        onChange={handleAddressChange} 
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">State / Province</label>
                      <input 
                        type="text"
                        name="state" 
                        value={addressData.state} 
                        onChange={handleAddressChange} 
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">ZIP / Postal Code</label>
                      <input 
                        type="text"
                        name="zip" 
                        value={addressData.zip} 
                        onChange={handleAddressChange} 
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Country</label>
                      <input 
                        type="text"
                        name="country" 
                        value={addressData.country} 
                        onChange={handleAddressChange} 
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent outline-none"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSaving}
                    className="w-full py-2.5 mt-4 bg-accent hover:bg-orange-600 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save Address'}
                  </button>
                </form>
              )}

              {/* Track Package Modal */}
              {activeModal === 'TRACK' && selectedOrder && (
                <div className="py-4">
                  <div className="mb-6">
                    <p className="text-sm text-gray-500">Order ID: {selectedOrder.id}</p>
                    <p className="font-bold text-gray-900 mt-1">Status: {selectedOrder.status}</p>
                  </div>
                  
                  <div className="relative border-l-2 border-gray-200 ml-4 space-y-8">
                    {[
                      { status: 'PENDING', label: 'Order Placed', icon: Box },
                      { status: 'PROCESSING', label: 'Processing', icon: Package },
                      { status: 'SHIPPED', label: 'Shipped', icon: Truck },
                      { status: 'DELIVERED', label: 'Delivered', icon: CheckCircle2 }
                    ].map((step, index) => {
                      const isActive = getTrackingStep(selectedOrder.status) >= index;
                      const Icon = step.icon;
                      
                      return (
                        <div key={step.status} className="relative pl-8">
                          <div className={`absolute -left-[17px] w-8 h-8 rounded-full flex items-center justify-center border-2 ${isActive ? 'bg-accent border-accent text-white' : 'bg-white border-gray-300 text-gray-400'}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <h4 className={`font-bold ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>{step.label}</h4>
                          {isActive && index === 0 && <p className="text-xs text-gray-500 mt-1">{new Date(selectedOrder.createdAt).toLocaleString()}</p>}
                          {isActive && index === getTrackingStep(selectedOrder.status) && <p className="text-xs text-accent mt-1">Current Status</p>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Invoice Modal */}
              {activeModal === 'INVOICE' && selectedOrder && (
                <div className="text-gray-800">
                  <div className="flex justify-between items-start border-b border-gray-200 pb-4 mb-4">
                    <div>
                      <h2 className="text-2xl font-black text-primary tracking-tighter">XENOTRIX</h2>
                      <p className="text-sm text-gray-500 mt-1">Invoice / Receipt</p>
                    </div>
                    <div className="text-right text-sm">
                      <p className="font-bold">Order #: {selectedOrder.id.substring(0, 8).toUpperCase()}</p>
                      <p>{new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="mb-6 text-sm">
                    <p className="font-bold text-gray-900 mb-1">Billed To:</p>
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                    <p className="mt-2 text-gray-700 leading-relaxed">
                      {(() => {
                        if (!user.address) return "No address provided.";
                        try {
                          const addr = JSON.parse(user.address);
                          return (
                            <>
                              {addr.street}<br/>
                              {addr.city}, {addr.state} {addr.zip}<br/>
                              {addr.country}
                            </>
                          );
                        } catch(e) {
                          return user.address;
                        }
                      })()}
                    </p>
                  </div>
                  
                  <table className="w-full text-left text-sm mb-6 border-t border-gray-200">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-2">Description</th>
                        <th className="py-2 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="py-3">E-commerce Purchase (Items hidden)</td>
                        <td className="py-3 text-right font-mono">₹{selectedOrder.totalAmount}</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-bold text-right">Total</td>
                        <td className="py-3 text-right font-bold font-mono text-lg text-accent">₹{selectedOrder.totalAmount}</td>
                      </tr>
                    </tbody>
                  </table>
                  
                  <div className="text-xs text-gray-500 text-center border-t border-gray-200 pt-4">
                    <p>Payment Method: {selectedOrder.paymentMethod.replace(/_/g, ' ')}</p>
                    <p className="mt-1">Thank you for shopping with Xenotrix!</p>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Profile;
