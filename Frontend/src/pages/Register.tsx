import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthForm from '../components/AuthForm'

import { authAPI } from '../api/auth';
import { useAuth } from '../context/AuthContext';

const Register: React.FC = () => {

  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (data: any) => {
    console.log('Register Payload:', data);
    try {
      setError(null);
      // Backend ko call lagao
      const response = await authAPI.register(data);
      // Context mein save karo (aur localStorage mein)
      login(response);
      // Dashboard par bhej do
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="mb-8 flex items-center gap-3">
        <iconify-icon icon="mdi:check-all" width="32" style={{ color: 'var(--color-brand)' }} />
        <h1 className="text-2xl font-bold tracking-wide text-text-main">Taskify.</h1>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-900/30 border border-red-500 rounded-xl text-red-200 text-sm w-full max-w-md text-center">
          {error}
        </div>
      )}

      <AuthForm type="register" onSubmit={handleRegister} />
    </div>
  )
}

export default Register
