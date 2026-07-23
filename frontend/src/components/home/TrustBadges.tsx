import { ShieldCheck, Truck, HeadphonesIcon, RefreshCw } from "lucide-react";

const badges = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-accent mb-4" />,
    title: "Secure Payments",
    description: "100% secure payment processing with Razorpay."
  },
  {
    icon: <Truck className="w-8 h-8 text-accent mb-4" />,
    title: "Fast Delivery",
    description: "Express delivery across Kerala and India."
  },
  {
    icon: <RefreshCw className="w-8 h-8 text-accent mb-4" />,
    title: "Easy Returns",
    description: "7-day hassle-free return policy."
  },
  {
    icon: <HeadphonesIcon className="w-8 h-8 text-accent mb-4" />,
    title: "24/7 Support",
    description: "Dedicated customer support anytime."
  }
];

const TrustBadges = () => {
  return (
    <section className="py-20 bg-gray-50 border-y border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {badges.map((badge, index) => (
            <div 
              key={index} 
              className="p-8 rounded-2xl bg-white border border-gray-100 hover:border-accent/30 transition-all flex flex-col items-center text-center group hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(0,186,255,0.15)]"
            >
              <div className="group-hover:scale-110 transition-transform duration-300">
                {badge.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{badge.title}</h3>
              <p className="text-gray-500 text-sm">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
