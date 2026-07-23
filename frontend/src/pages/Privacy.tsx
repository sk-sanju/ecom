const Privacy = () => {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <div className="prose prose-blue max-w-none text-gray-600">
          <p className="mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
          <p className="mb-4">We collect information that you provide directly to us, including your name, email address, postal address, phone number, and payment information when you make a purchase.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h2>
          <p className="mb-4">We use the information we collect to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Process your orders and payments</li>
            <li>Send you order confirmations and updates</li>
            <li>Respond to your customer service requests</li>
            <li>Send you marketing communications (if you've opted in)</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Data Security</h2>
          <p className="mb-4">We implement appropriate security measures to protect your personal information. Your payment information is encrypted and processed securely.</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
