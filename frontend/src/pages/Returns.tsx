const Returns = () => {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Returns & Refunds Center</h1>
        <div className="prose prose-blue max-w-none text-gray-800">
          <p className="mb-6">At Xenotrix, our priority is your satisfaction. If you are not completely satisfied with your purchase, we're here to help.</p>
          
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Our Return Policy</h2>
          <p className="mb-4">You have <strong>30 calendar days</strong> to return an item from the date you received it. To be eligible for a return, your item must be:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Unused and in the same condition that you received it</li>
            <li>In the original packaging</li>
            <li>Accompanied by the receipt or proof of purchase</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Refunds</h2>
          <p className="mb-4">Once we receive your item, we will inspect it and notify you that we have received your returned item. We will immediately notify you on the status of your refund after inspecting the item.</p>
          <p className="mb-6">If your return is approved, we will initiate a refund to your credit card (or original method of payment). You will receive the credit within a certain amount of days, depending on your card issuer's policies.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Shipping Returns</h2>
          <p className="mb-4">You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.</p>
        </div>
      </div>
    </div>
  );
};

export default Returns;
