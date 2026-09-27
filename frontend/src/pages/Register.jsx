import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/api';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !password) { setError('Please fill in all fields'); return; }
    setLoading(true); setError('');
    try {
      const data = await registerUser(name, email, password);
      if (data.token) {
        alert('Registered successfully! Please login.');
        navigate('/login');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-1">Create Account 🚀</h2>
        <p className="text-gray-500 text-center text-sm mb-6">Join UrbanCart today</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm mb-4">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-4">
          <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-400" />
          <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-400" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-400" />
          <button
            onClick={handleRegister}
            disabled={loading}
            className="py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-semibold transition"
          >
            {loading ? 'Registering...' : 'Create Account'}
          </button>
          <p className="text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-600 font-semibold hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;