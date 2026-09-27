function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 px-8 py-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-900 text-white rounded-2xl p-6 text-center">
          <p className="text-gray-400 text-sm mb-1">Total Orders</p>
          <p className="text-4xl font-extrabold">0</p>
        </div>
        <div className="bg-purple-600 text-white rounded-2xl p-6 text-center">
          <p className="text-purple-200 text-sm mb-1">Revenue</p>
          <p className="text-4xl font-extrabold">₹0</p>
        </div>
        <div className="bg-pink-500 text-white rounded-2xl p-6 text-center">
          <p className="text-pink-200 text-sm mb-1">Products</p>
          <p className="text-4xl font-extrabold">15</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <p className="text-gray-500 text-sm">Use the navigation links to manage Products, Orders, and Users.</p>
      </div>
    </div>
  );
}

export default AdminDashboard;