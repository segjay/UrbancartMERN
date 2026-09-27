import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4">
        <p className="text-6xl mb-4">🛒</p>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Add some products to get started</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition"
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Cart 🛒</h2>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-4">
        {cartItems.map((item, index) => (
          <div
            key={item._id}
            className={`flex items-center gap-4 px-6 py-4 ${index < cartItems.length - 1 ? 'border-b border-gray-100' : ''}`}
          >
            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl" />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800">{item.name}</h4>
              <p className="text-purple-600 font-bold">₹{item.price.toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                className="w-8 h-8 rounded-full border border-gray-200 hover:border-purple-400 flex items-center justify-center transition"
              >-</button>
              <span className="font-semibold w-6 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                className="w-8 h-8 rounded-full border border-gray-200 hover:border-purple-400 flex items-center justify-center transition"
              >+</button>
            </div>
            <p className="font-bold text-gray-800 w-24 text-right">₹{(item.price * item.quantity).toLocaleString()}</p>
            <button
              onClick={() => removeFromCart(item._id)}
              className="w-8 h-8 bg-red-50 hover:bg-red-100 text-red-400 rounded-full flex items-center justify-center transition"
            >✕</button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 flex justify-between items-center flex-wrap gap-4">
        <div>
          <p className="text-gray-500 text-sm">Total Amount</p>
          <h3 className="text-2xl font-extrabold text-gray-900">₹{total.toLocaleString()}</h3>
        </div>
        <div className="flex gap-3">
          <button
            onClick={clearCart}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl font-semibold transition"
          >Clear Cart</button>
          <button
            onClick={() => navigate('/checkout')}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition"
          >Checkout →</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;