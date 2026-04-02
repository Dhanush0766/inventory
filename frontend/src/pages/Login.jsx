import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FiPackage, FiLock, FiUser, FiArrowRight } from 'react-icons/fi';
import ThreeDBox from '../components/ThreeDBox';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error('Please enter username and password');
      return;
    }

    setIsLoading(true);
    try {
      const user = await login(username, password);
      toast.success(`Welcome back, ${user.full_name || user.username}!`);
      navigate(user.role === 'admin' ? '/admin/dashboard' : '/staff/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <ThreeDBox 
        className="login-3d-bg" 
        color="#8b5cf6"
        isDistorted={false}
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}
      />
      <div className="login-container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">
              <FiPackage />
            </div>
            <h1>Inventory Pro</h1>
            <p>Large Scale Inventory Management System</p>
          </div>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username">
                <FiUser className="input-icon" />
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                autoComplete="username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">
                <FiLock className="input-icon" />
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
            </div>
            <button type="submit" className="login-btn" disabled={isLoading}>
              {isLoading ? (
                <span className="spinner"></span>
              ) : (
                <>
                  Sign In <FiArrowRight />
                </>
              )}
            </button>
          </form>
          <div className="login-footer">
            <p>Demo Credentials</p>
            <div className="demo-creds">
              <span><strong>Admin:</strong> admin / admin123</span>
              <span><strong>Staff:</strong> staff1 / admin123</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
