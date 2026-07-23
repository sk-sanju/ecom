const Terms = () => {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms & Conditions</h1>
        <div className="prose prose-blue max-w-none text-gray-600">
          <p className="mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Agreement to Terms</h2>
          <p className="mb-4">By accessing our website, you agree to be bound by these Terms and Conditions and agree that you are responsible for compliance with any applicable local laws.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Products and Pricing</h2>
          <p className="mb-4">All products are subject to availability. We reserve the right to discontinue any product at any time. Prices for all products are subject to change without notice.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Shipping and Delivery</h2>
          <p className="mb-4">Shipping times are estimates and not guarantees. We are not responsible for delays caused by the shipping carrier or customs clearance processes.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Returns and Refunds</h2>
          <p className="mb-4">Our return policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately, we can't offer you a refund or exchange. To be eligible for a return, your item must be unused and in the same condition that you received it.</p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
