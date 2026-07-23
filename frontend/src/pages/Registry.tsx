import { Search, Gift, Heart, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Registry = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-[#F0F2F2] py-16 border-b border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Gift Registry</h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">Celebrate life's special moments with the perfect gifts. Find a registry or create your own.</p>
          
          <div className="max-w-xl mx-auto bg-white p-4 rounded-2xl shadow-md flex flex-col sm:flex-row gap-4">
            <input 
              type="text" 
              placeholder="Search by registrant name" 
              className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
            />
            <button className="bg-accent hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-md transition-colors flex items-center justify-center gap-2">
              <Search className="w-5 h-5" /> Find
            </button>
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">What are you celebrating?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { title: "Wedding Registry", desc: "Everything you need to build your new life together.", icon: Heart, color: "text-pink-500", bg: "bg-pink-50" },
            { title: "Baby Registry", desc: "Welcome your little one with all the essentials.", icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
            { title: "Custom Registry", desc: "For birthdays, anniversaries, and other special events.", icon: Gift, color: "text-purple-500", bg: "bg-purple-50" }
          ].map((type, i) => (
            <div key={i} className="text-center p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className={`w-16 h-16 mx-auto ${type.bg} rounded-full flex items-center justify-center mb-6`}>
                <type.icon className={`w-8 h-8 ${type.color}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{type.title}</h3>
              <p className="text-gray-600 mb-6">{type.desc}</p>
              <Link to="/login" className="inline-block border-2 border-gray-900 text-gray-900 font-bold py-2 px-6 rounded-full hover:bg-gray-900 hover:text-white transition-colors">
                Create Registry
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-12">Why create a registry with Xenotrix?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Free Returns</h4>
              <p className="text-sm text-gray-600">Enjoy 90-day returns on most items.</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Completion Discount</h4>
              <p className="text-sm text-gray-600">Get a 15% discount on remaining items after your event.</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Universal Registry</h4>
              <p className="text-sm text-gray-600">Add items from any website to your Xenotrix registry.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registry;
