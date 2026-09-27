import { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../services/api';

function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [loading, setLoading] = useState(false);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!userInfo) {
    navigate('/login');
    return null;
  }

  const handlePlaceOrder = async () => {
    if (!address || !city || !pincode) {
      alert('Please fill in all address fields');
      return;
    }
    setLoading(true);
    try {
      const orderData = {
        orderItems: cartItems.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.image,
          product: item._id,
        })),
        shippingAddress: { address, city, pincode },
        totalPrice: total,
      };
      const data = await createOrder(orderData, userInfo._id);
      if (data._id) {
        clearCart();
        alert('Order placed successfully!');
        navigate('/my-orders');
      } else {
        alert(data.message || 'Order failed');
      }
    } catch {
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h2>

      <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Delivery Address</h3>
        <div className="flex flex-col gap-3">
          <input placeholder="Street Address" value={address} onChange={(e) => setAddress(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-400" />
          <input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-400" />
          <input placeholder="Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-400" />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
        {cartItems.map((item) => (
          <div key={item._id} className="flex justify-between py-2 border-b border-gray-100 text-sm">
            <span className="text-gray-600">{item.name} × {item.quantity}</span>
            <span className="font-semibold text-gray-800">₹{(item.price * item.quantity).toLocaleString()}</span>
          </div>
        ))}
        <div className="flex justify-between mt-4 text-lg font-extrabold text-gray-900">
          <span>Total</span>
          <span className="text-purple-600">₹{total.toLocaleString()}</span>
        </div>
      </div>

      <button
        onClick={handlePlaceOrder}
        disabled={loading}
        className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-bold text-lg transition"
      >
        {loading ? 'Placing Order...' : 'Place Order 🎉'}
      </button>
    </div>
  );
}

export default Checkout;