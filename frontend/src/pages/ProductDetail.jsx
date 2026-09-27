import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { getProductById } from '../services/api';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-purple-600 text-xl font-semibold">Loading...</p>
    </div>
  );

  if (!product) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-500 text-xl">Product not found.</p>
    </div>
  );

  const handleAddToCart = () => {
    addToCart(product);
    navigate('/cart');
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-gray-500 hover:text-gray-800 flex items-center gap-1 transition"
      >
        ← Back
      </button>

      <div className="bg-white rounded-2xl shadow-sm p-8 max-w-4xl mx-auto">
        <div className="flex gap-8 flex-wrap">
          <img
            src={product.image}
            alt={product.name}
            className="w-72 h-72 object-cover rounded-2xl"
          />
          <div className="flex-1 min-w-60">
            <span className="bg-purple-100 text-purple-600 text-xs font-semibold px-3 py-1 rounded-full">
              {product.category}
            </span>
            <h2 className="text-2xl font-extrabold text-gray-900 mt-3 mb-2">{product.name}</h2>
            <p className="text-gray-500 text-sm mb-4">{product.description}</p>
            <p className="text-3xl font-extrabold text-purple-600 mb-2">₹{product.price.toLocaleString()}</p>
            <p className="text-sm text-gray-400 mb-2">⭐ {product.rating} rating</p>

            {product.stock === 0 ? (
              <p className="text-red-500 font-semibold mb-4">Out of Stock</p>
            ) : (
              <p className="text-green-500 font-semibold mb-4">In Stock ({product.stock} left)</p>
            )}

            {product.stock > 0 && (
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleAddToCart}
                  className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-semibold transition"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition"
                >
                  Buy Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;