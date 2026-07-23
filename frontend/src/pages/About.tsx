import { CheckCircle } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gray-50 py-20 border-b border-gray-100">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Xenotrix</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            We are a premium e-commerce brand based in Kerala, India, dedicated to bringing you the highest quality lifestyle products with an uncompromising focus on design and durability.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-20 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Founded with a simple mission: to make premium, minimalist design accessible to everyone. We believe that the objects you interact with every day should bring you joy and function flawlessly.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Every product in our collection is carefully curated and rigorously tested to meet our exacting standards for quality, aesthetics, and sustainability.
            </p>

            <ul className="space-y-4">
              {[
                "Premium quality materials",
                "Sustainable packaging",
                "Ethical manufacturing",
                "Exceptional customer service"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-accent/10 translate-x-4 translate-y-4 rounded-3xl" />
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80" 
              alt="Our Team" 
              className="relative rounded-3xl shadow-xl w-full h-auto object-cover aspect-square"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
