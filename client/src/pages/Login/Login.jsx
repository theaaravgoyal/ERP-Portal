import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { ROUTES } from '../../constants/Routes';
import { APP_CONFIG } from '../../config/app';

const Login = () => {
  const { login, token } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // If already authenticated, redirect straight to dashboard
  useEffect(() => {
    if (token) {
      navigate(ROUTES.DASHBOARD);
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);
    const result = await login(email, password);
    setIsSubmitting(false);

    if (result.success) {
      navigate(ROUTES.DASHBOARD);
    } else {
      setErrorMessage(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-brand-red/10 blur-[128px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-brand-red/10 blur-[128px] pointer-events-none"></div>

      <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-8 rounded-2xl shadow-2xl relative z-10">
        {/* Portal Branding */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-red to-brand-red-hover flex items-center justify-center font-bold text-white text-lg mx-auto mb-4 shadow-lg shadow-brand-red/20">
            EP
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mb-2">{APP_CONFIG.NAME}</h1>
          <p className="text-sm text-slate-400">Sign in to access your administrative dashboard</p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-455 flex items-start gap-3 text-sm">
            <AlertCircle className="shrink-0 mt-0.5" size={18} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email input */}
          <Input
            label="Email Address"
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="superadmin@erp.com"
            icon={Mail}
          />

          {/* Password input */}
          <div className="relative">
            <Input
              label="Password"
              id="password"
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              icon={Lock}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 bottom-3.5 text-slate-500 hover:text-slate-350 transition-colors z-10"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Remember me or quick credentials tip */}
          <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-800/60 text-xs text-slate-500 text-center">
            Demo Credentials: <span className="font-semibold text-brand-red font-mono">superadmin@erp.com</span> / <span className="font-semibold text-brand-red font-mono">admin123</span>
          </div>

          {/* Sign In Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full font-semibold"
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
