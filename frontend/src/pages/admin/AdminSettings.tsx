import { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { Save, Loader2 } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const AdminSettings = () => {
  const { token, user, updateUser } = useAuth();
  const [storeName, setStoreName] = useState("Xenotrix Store");
  const [email, setEmail] = useState("support@xenotrix.com");
  const [currency, setCurrency] = useState("INR");
  
  // Theme colors
  const [primaryColor, setPrimaryColor] = useState("#2874f0");
  const [secondaryColor, setSecondaryColor] = useState("#ffe500");
  const [accentColor, setAccentColor] = useState("#fb641b");
  
  // Hero Banners
  const [heroBanners, setHeroBanners] = useState([
    {
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2000&auto=format&fit=crop",
      title: "Summer Collection 2026",
      subtitle: "Discover the latest trends with up to 50% off."
    }
  ]);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // Admin Profile
  const [adminName, setAdminName] = useState(user?.name || "");
  const [adminEmail, setAdminEmail] = useState(user?.email || "");
  const [adminPassword, setAdminPassword] = useState("");
  const [isAdminSaving, setIsAdminSaving] = useState(false);

  useEffect(() => {
    if (user?.name) setAdminName(user.name);
    if (user?.email) setAdminEmail(user.email);
  }, [user]);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/settings");
        if (res.ok) {
          const settings = await res.json();
          if (settings.storeName) setStoreName(settings.storeName);
          if (settings.email) setEmail(settings.email);
          if (settings.currency) setCurrency(settings.currency);
          if (settings.primaryColor) setPrimaryColor(settings.primaryColor);
          if (settings.secondaryColor) setSecondaryColor(settings.secondaryColor);
          if (settings.accentColor) setAccentColor(settings.accentColor);
          if (settings.heroBanners) {
            try {
              setHeroBanners(JSON.parse(settings.heroBanners));
            } catch(e) { console.error(e) }
          }
        }
      } catch (err) {
        console.error("Failed to fetch settings:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const payload = {
        storeName,
        email,
        currency,
        primaryColor,
        secondaryColor,
        accentColor,
        heroBanners: JSON.stringify(heroBanners)
      };
      
      const res = await fetch("http://localhost:5000/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        alert("Settings saved successfully!");
        // Update CSS variables immediately for preview
        document.documentElement.style.setProperty("--color-primary", primaryColor);
        document.documentElement.style.setProperty("--color-secondary", secondaryColor);
        document.documentElement.style.setProperty("--color-accent", accentColor);
      } else {
        alert("Failed to save settings.");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving settings.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAdminSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdminSaving(true);
    
    try {
      const payload: any = { name: adminName, email: adminEmail };
      if (adminPassword) {
        payload.password = adminPassword;
      }
      
      const res = await fetch("http://localhost:5000/api/auth/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        const updatedUser = await res.json();
        updateUser(updatedUser);
        alert("Admin profile updated successfully!");
        setAdminPassword("");
      } else {
        alert("Failed to update admin profile.");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating admin profile.");
    } finally {
      setIsAdminSaving(false);
    }
  };


  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 text-accent animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Store Settings Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Store Settings</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your store's general configuration and appearance.</p>
        </div>
        
        <form onSubmit={handleSave} className="p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Store Name</label>
              <input 
                type="text" 
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Contact Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Currency</label>
              <select 
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent"
              >
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </div>
            
            <hr className="my-6 border-gray-100" />
            
            <h3 className="text-md font-bold text-gray-900">Theme Colors</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Primary Color</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="color" 
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer border-0 p-0"
                  />
                  <span className="text-sm text-gray-600 font-mono uppercase">{primaryColor}</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Secondary Color</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="color" 
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer border-0 p-0"
                  />
                  <span className="text-sm text-gray-600 font-mono uppercase">{secondaryColor}</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Accent Color</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="color" 
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer border-0 p-0"
                  />
                  <span className="text-sm text-gray-600 font-mono uppercase">{accentColor}</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg mt-4 flex items-center justify-center gap-4">
               <button type="button" style={{ backgroundColor: primaryColor }} className="px-4 py-2 text-white rounded font-bold">Primary</button>
               <button type="button" style={{ backgroundColor: secondaryColor }} className="px-4 py-2 text-black rounded font-bold">Secondary</button>
               <button type="button" style={{ backgroundColor: accentColor }} className="px-4 py-2 text-white rounded font-bold">Accent</button>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
            <button 
              type="submit" 
              disabled={isSaving}
              className="px-6 py-2 bg-accent hover:bg-orange-600 text-white rounded-lg font-bold flex items-center gap-2 transition-colors disabled:opacity-70"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Admin Profile Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Admin Profile</h2>
          <p className="text-sm text-gray-500 mt-1">Update your login details.</p>
        </div>
        
        <form onSubmit={handleAdminSave} className="p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Name</label>
              <input 
                type="text" 
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Email (Login ID)</label>
              <input 
                type="email" 
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">New Password (leave blank to keep current)</label>
              <input 
                type="password" 
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent"
              />
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
            <button 
              type="submit" 
              disabled={isAdminSaving}
              className="px-6 py-2 bg-accent hover:bg-orange-600 text-white rounded-lg font-bold flex items-center gap-2 transition-colors disabled:opacity-70"
            >
              {isAdminSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Profile
            </button>
          </div>
        </form>
      </div>
      
      {/* Hero Banners Management Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mt-8">
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Hero Banners</h2>
            <p className="text-sm text-gray-500 mt-1">Manage the main sliding banners on the homepage.</p>
          </div>
          <button 
            type="button" 
            onClick={() => setHeroBanners([...heroBanners, { image: "", title: "", subtitle: "" }])}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-bold text-sm transition-colors"
          >
            + Add Banner
          </button>
        </div>
        
        <form onSubmit={handleSave} className="p-6">
          <div className="space-y-6">
            {heroBanners.map((banner, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-xl relative group">
                <button 
                  type="button" 
                  onClick={() => {
                    const newBanners = [...heroBanners];
                    newBanners.splice(index, 1);
                    setHeroBanners(newBanners);
                  }}
                  className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity bg-red-50 p-1 rounded-md"
                >
                  Remove
                </button>
                <h4 className="font-bold mb-3 text-gray-700">Banner {index + 1}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-600 mb-1">Image URL</label>
                    <input 
                      type="url" 
                      value={banner.image}
                      onChange={(e) => {
                        const newBanners = [...heroBanners];
                        newBanners[index].image = e.target.value;
                        setHeroBanners(newBanners);
                      }}
                      className="w-full px-3 py-1.5 border border-gray-300 rounded focus:ring-accent focus:border-accent text-sm"
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Title</label>
                    <input 
                      type="text" 
                      value={banner.title}
                      onChange={(e) => {
                        const newBanners = [...heroBanners];
                        newBanners[index].title = e.target.value;
                        setHeroBanners(newBanners);
                      }}
                      className="w-full px-3 py-1.5 border border-gray-300 rounded focus:ring-accent focus:border-accent text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Subtitle</label>
                    <input 
                      type="text" 
                      value={banner.subtitle}
                      onChange={(e) => {
                        const newBanners = [...heroBanners];
                        newBanners[index].subtitle = e.target.value;
                        setHeroBanners(newBanners);
                      }}
                      className="w-full px-3 py-1.5 border border-gray-300 rounded focus:ring-accent focus:border-accent text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
            {heroBanners.length === 0 && <p className="text-gray-500 text-sm">No banners added.</p>}
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
            <button 
              type="submit" 
              disabled={isSaving}
              className="px-6 py-2 bg-accent hover:bg-orange-600 text-white rounded-lg font-bold flex items-center gap-2 transition-colors disabled:opacity-70"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save All Settings
            </button>
          </div>
        </form>
      </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
