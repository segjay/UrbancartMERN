import { useState, useEffect } from 'react';

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: '', description: '', price: '', category: '', stock: '', image: '',
  });
  const [formLoading, setFormLoading] = useState(false);

  const categories = ['Electronics', 'Footwear', 'Accessories', 'Clothing', 'Books'];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      alert('Something went wrong');
    }
  };

  const handleAddProduct = async () => {
    if (!form.name || !form.price || !form.category || !form.stock || !form.image) {
      alert('Please fill all required fields');
      return;
    }
    setFormLoading(true);
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          stock: Number(form.stock),
        }),
      });
      const data = await res.json();
      if (data._id) {
        setProducts([...products, data]);
        setForm({ name: '', description: '', price: '', category: '', stock: '', image: '' });
        setShowForm(false);
        alert('Product added successfully!');
      } else {
        alert(data.message || 'Failed to add product');
      }
    } catch (error) {
      alert('Something went wrong');
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) return <p className="p-8 text-purple-600">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Manage Products</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition"
        >
          {showForm ? 'Cancel' : '+ Add Product'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Product</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              placeholder="Product Name *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-400"
            />
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-400 bg-white"
            >
              <option value="">Select Category *</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <input
              placeholder="Price (₹) *"
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-400"
            />
            <input
              placeholder="Stock *"
              type="number"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-400"
            />
            <input
              placeholder="Image URL *"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-400 sm:col-span-2"
            />
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-400 sm:col-span-2 resize-none"
            />
          </div>
          <button
            onClick={handleAddProduct}
            disabled={formLoading}
            className="mt-4 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition"
          >
            {formLoading ? 'Adding...' : 'Add Product'}
          </button>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="px-4 py-3 text-left text-sm">Image</th>
              <th className="px-4 py-3 text-left text-sm">Name</th>
              <th className="px-4 py-3 text-left text-sm">Price</th>
              <th className="px-4 py-3 text-left text-sm">Stock</th>
              <th className="px-4 py-3 text-left text-sm">Category</th>
              <th className="px-4 py-3 text-left text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, index) => (
              <tr key={p._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-3">
                  <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded-lg" />
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 font-medium">{p.name}</td>
                <td className="px-4 py-3 text-sm font-semibold text-purple-600">₹{p.price?.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${p.stock === 0 ? 'bg-red-100 text-red-500' : 'bg-green-100 text-green-600'}`}>
                    {p.stock === 0 ? 'Out of Stock' : p.stock}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">{p.category}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-lg transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminProducts;