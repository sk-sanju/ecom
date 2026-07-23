import { Link } from "react-router-dom";
import { Search, Package, RefreshCcw, CreditCard, User, HelpCircle } from "lucide-react";

const CustomerService = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Hello. What can we help you with?</h1>
          <div className="max-w-2xl mx-auto relative">
            <input 
              type="text" 
              placeholder="Search our help library" 
              className="w-full pl-4 pr-12 py-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-accent rounded-md hover:bg-orange-600 transition-colors">
              <Search className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Some things you can do here</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { title: "Your Orders", desc: "Track packages, edit or cancel orders", icon: Package, link: "/profile" },
            { title: "Returns & Refunds", desc: "Return or exchange items", icon: RefreshCcw, link: "/returns" },
            { title: "Payment Options", desc: "Manage payment methods", icon: CreditCard, link: "/profile" },
            { title: "Account Settings", desc: "Update your email, password", icon: User, link: "/profile" },
            { title: "Digital Services", desc: "Manage your digital purchases", icon: HelpCircle, link: "/contact" },
            { title: "Contact Us", desc: "Reach out to our support team", icon: HelpCircle, link: "/contact" }
          ].map((item, i) => (
            <Link key={i} to={item.link} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:border-accent transition-colors flex items-start gap-4 group">
              <div className="p-3 bg-gray-50 rounded-full group-hover:bg-orange-50 transition-colors">
                <item.icon className="w-6 h-6 text-gray-700 group-hover:text-accent" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-6">Find more solutions</h2>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {["Where is my order?", "How do I return an item?", "What are your shipping rates?", "Why was my payment declined?", "How do I use a gift card?"].map((q, i) => (
              <li key={i}>
                <Link to="/contact" className="block p-4 hover:bg-gray-50 transition-colors text-blue-600 ">
                  {q}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CustomerService;
