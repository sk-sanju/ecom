const Shipping = () => {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shipping Information</h1>
        <div className="prose prose-blue max-w-none text-gray-800">
          <p className="mb-6">We want you to get your Xenotrix products as quickly as possible. We offer several shipping options to meet your needs.</p>
          
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Shipping Rates & Estimates</h2>
          <div className="border border-gray-200 rounded-lg overflow-hidden mb-8">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="py-3 px-4 font-bold text-gray-900">Shipping Method</th>
                  <th className="py-3 px-4 font-bold text-gray-900">Estimated Delivery</th>
                  <th className="py-3 px-4 font-bold text-gray-900">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-3 px-4">Standard Delivery</td>
                  <td className="py-3 px-4">3-5 Business Days</td>
                  <td className="py-3 px-4 text-green-600 font-bold">Free</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Expedited</td>
                  <td className="py-3 px-4">2 Business Days</td>
                  <td className="py-3 px-4">₹150.00</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Overnight</td>
                  <td className="py-3 px-4">Next Business Day</td>
                  <td className="py-3 px-4">₹250.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Order Processing Time</h2>
          <p className="mb-4">All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays.</p>
          <p className="mb-6">If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional days in transit for delivery.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Shipping Restrictions</h2>
          <p className="mb-4">We currently only ship within India. We do not ship to P.O. boxes or APO/FPO addresses.</p>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
