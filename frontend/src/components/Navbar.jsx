import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

function Navbar() {
  const { cartItems } = useContext(CartContext);
  const { userInfo, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center shadow-lg sticky top-0 z-50">
      <Link to="/" className="text-2xl font-extrabold">
        <span className="text-purple-400">Urban</span>
        <span className="text-pink-400">Cart</span>
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/" className="text-gray-300 hover:text-white transition">Home</Link>

        <Link to="/cart" className="relative text-gray-300 hover:text-white transition">
          🛒 Cart
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </Link>

        {userInfo ? (
          <>
            <span className="text-purple-400 font-semibold">Hi, {userInfo.name.split(' ')[0]} 👋</span>
            <Link to="/my-orders" className="text-gray-300 hover:text-white transition">My Orders</Link>

            {userInfo.isAdmin && (
              <>
                <Link to="/admin/dashboard" className="text-pink-400 hover:text-pink-300 transition">Dashboard</Link>
                <Link to="/admin/products" className="text-pink-400 hover:text-pink-300 transition">Products</Link>
                <Link to="/admin/users" className="text-pink-400 hover:text-pink-300 transition">Users</Link>
              </>
            )}

            <button
              onClick={handleLogout}
              className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;