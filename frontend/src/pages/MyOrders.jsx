import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getMyOrders } from '../services/api';

function MyOrders() {
  const { userInfo } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) { navigate('/login'); return; }
    const fetchOrders = async () => {
      try {
        const data = await getMyOrders(userInfo._id);
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [userInfo, navigate]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-purple-600 text-xl font-semibold">Loading orders...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Orders 📦</h2>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
          <p className="text-5xl mb-4">📦</p>
          <p className="text-gray-500 text-lg">No orders yet.</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex justify-between items-start flex-wrap gap-2 mb-3">
                <div>
                  <p className="text-xs text-gray-400">Order ID</p>
                  <p className="font-mono text-sm text-gray-600">{order._id}</p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3">
                {order.orderItems.map((item, index) => (
                  <p key={index} className="text-sm text-gray-500 py-1">
                    {item.name} × {item.quantity} —{' '}
                    <span className="font-semibold text-gray-700">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </p>
                ))}
              </div>

              <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                  <p className="font-extrabold text-purple-600 mt-1">
                    Total: ₹{order.totalPrice?.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrders;