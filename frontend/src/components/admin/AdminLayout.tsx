import { ReactNode } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut, Tag } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const { user, logout } = useAuth();

  // Basic role protection
  if (!user || user.role !== "ADMIN") {
    return <Navigate to="/admin/login" replace />;
  }

  const menuItems = [
    { path: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/admin/orders", icon: ShoppingCart, label: "Orders" },
    { path: "/admin/products", icon: Package, label: "Products" },
    { path: "/admin/offers", icon: Tag, label: "Offers" },
    { path: "/admin/users", icon: Users, label: "Customers" },
    { path: "/admin/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex fixed h-full z-10">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <Link to="/" className="text-xl font-bold text-gray-900 tracking-tight">
            XENOTRIX <span className="text-accent">ADMIN</span>
          </Link>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? "bg-blue-50 text-accent font-bold" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-accent" : "text-gray-400"}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl text-red-600 hover:bg-red-50 transition-colors font-medium"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 bg-gray-50 min-h-screen pb-12">
        <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-10 flex items-center justify-between px-8">
          <h1 className="text-xl font-bold text-gray-800">
            {menuItems.find(m => m.path === location.pathname)?.label || "Admin Area"}
          </h1>
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="text-sm font-medium px-4 py-2 text-accent border border-accent rounded-lg hover:bg-accent hover:text-white transition-colors"
            >
              Go to Shop
            </Link>
            <span className="text-sm font-medium text-gray-600">{user?.name || "Admin User"}</span>
            <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold text-sm uppercase">
              {user?.name ? user.name.charAt(0) : "A"}
            </div>
          </div>
        </header>
        
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
