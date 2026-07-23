import { Gift, CreditCard, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const GiftCards = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">The Perfect Gift, Every Time</h1>
            <p className="text-lg text-gray-300 mb-8">Give them exactly what they want with a Xenotrix Gift Card. Available in digital or physical formats.</p>
            <div className="flex gap-4">
              <button className="bg-accent hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-colors">
                Buy eGift Card
              </button>
              <button className="bg-transparent border border-white hover:bg-white hover:text-gray-900 font-bold py-3 px-8 rounded-full transition-colors">
                Buy Physical Card
              </button>
            </div>
          </div>
          
          {/* Card Graphic */}
          <div className="relative w-80 h-48 rounded-xl bg-gradient-to-br from-accent to-orange-400 p-6 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <div className="flex justify-between items-start mb-12">
              <span className="text-white font-black text-xl tracking-tighter">XENOTRIX</span>
              <Gift className="w-8 h-8 text-white/50" />
            </div>
            <div className="flex justify-between items-end">
              <span className="text-white/80 font-medium">Gift Card</span>
              <span className="text-white font-bold text-2xl">₹1000+</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">How would you like to send it?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">eGift Card (Email)</h3>
            <p className="text-gray-600 mb-6">Delivered instantly or schedule for a future date. The perfect last-minute gift.</p>
            <button className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-md transition-colors">
              Send via Email
            </button>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-6">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Physical Gift Card</h3>
            <p className="text-gray-600 mb-6">Shipped for free in a premium greeting card. Great for handing out in person.</p>
            <button className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-md transition-colors">
              Send via Mail
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white border-t border-gray-200 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Already have a gift card?</h2>
          <p className="text-gray-600 mb-6">Check your balance or redeem it to your account.</p>
          <Link to="/login" className="text-accent font-bold ">Redeem a Gift Card &rarr;</Link>
        </div>
      </div>
    </div>
  );
};

export default GiftCards;
