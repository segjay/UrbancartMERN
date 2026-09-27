import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-12">
      <div className="max-w-6xl mx-auto px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-extrabold mb-3">
              <span className="text-purple-400">Urban</span>
              <span className="text-pink-400">Cart</span>
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Your one-stop destination for quality products at unbeatable
              prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <Link to="/" className="hover:text-purple-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-purple-400 transition">
                  Cart
                </Link>
              </li>
              <li>
                <Link
                  to="/my-orders"
                  className="hover:text-purple-400 transition"
                >
                  My Orders
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-purple-400 transition">
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="hover:text-purple-400 transition"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-3">Categories</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li className="hover:text-purple-400 transition cursor-pointer">
                Electronics
              </li>
              <li className="hover:text-purple-400 transition cursor-pointer">
                Footwear
              </li>
              <li className="hover:text-purple-400 transition cursor-pointer">
                Clothing
              </li>
              <li className="hover:text-purple-400 transition cursor-pointer">
                Accessories
              </li>
              <li className="hover:text-purple-400 transition cursor-pointer">
                Books
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-3">Contact Us</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li>📧 jay.alter02@gmail.com</li>
              <li>🌐 github.com/segvjay</li>
              <li>📍 Jaipur, Rajasthan, India</li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a
                href="https://github.com/segvjay"
                target="_blank"
                rel="noreferrer"
                className="bg-gray-800 hover:bg-purple-600 text-white px-3 py-1.5 rounded-lg text-xs transition"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="bg-gray-800 hover:bg-purple-600 text-white px-3 py-1.5 rounded-lg text-xs transition"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-gray-600">
            © 2026 UrbanCart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
