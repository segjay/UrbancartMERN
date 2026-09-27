import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer w-52 border border-gray-100"
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-44 object-cover rounded-t-2xl"
        />
        {product.stock === 0 && (
          <span className="absolute top-2 right-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
            Out of Stock
          </span>
        )}
      </div>

      <div className="p-3">
        <h3 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-purple-600 font-bold text-lg">₹{product.price.toLocaleString()}</p>
        <p className="text-xs text-gray-400 mb-3">⭐ {product.rating} · {product.category}</p>

        {product.stock > 0 ? (
          <button
            onClick={handleAddToCart}
            className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-semibold transition"
          >
            + Add to Cart
          </button>
        ) : (
          <button disabled className="w-full py-2 bg-gray-100 text-gray-400 rounded-xl text-sm cursor-not-allowed">
            Out of Stock
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;