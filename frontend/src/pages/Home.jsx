import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/api';

const categories = ['All', 'Electronics', 'Footwear', 'Accessories', 'Clothing', 'Books'];

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === 'All' || p.category === category;
    return matchSearch && matchCategory;
  });

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-purple-600 text-xl font-semibold">Loading products...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 px-8 text-center">
        <h1 className="text-4xl font-extrabold mb-2">
          Welcome to <span className="text-purple-400">Urban</span><span className="text-pink-400">Cart</span>
        </h1>
        <p className="text-gray-400 text-lg">Discover amazing products at unbeatable prices</p>
      </div>

      <div className="px-8 py-6">

        {/* Search + Filter */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-6 flex gap-4 flex-wrap">
          <input
            type="text"
            placeholder="🔍 Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-48 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-purple-400"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-purple-400 bg-white"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Results count */}
        <p className="text-gray-500 text-sm mb-4">
          Showing <span className="font-semibold text-gray-700">{filtered.length}</span> products
          {category !== 'All' && ` in ${category}`}
          {search && ` for "${search}"`}
        </p>

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-5xl mb-4">😕</p>
            <p className="text-gray-500 text-lg mb-4">No products found</p>
            <button
              onClick={() => { setSearch(''); setCategory('All'); }}
              className="px-6 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap gap-6">
            {filtered.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;