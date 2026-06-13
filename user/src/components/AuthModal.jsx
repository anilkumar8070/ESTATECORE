import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, Home, Eye, EyeOff, Mail, Lock, User, Phone, MapPin } from 'lucide-react';

const AuthModal = ({ isOpen, onClose, defaultTab = 'login' }) => {
  const navigate = useNavigate();
  const [tab, setTab] = useState(defaultTab);
  const [showPassword, setShowPassword] = useState(false);

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    password: '',
    role: 'buyer',
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    onClose();
    navigate('/user/dashboard');
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    onClose();
    navigate('/user/dashboard');
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.92, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, scale: 0.92, y: 30, transition: { duration: 0.25 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-white rounded-[2rem] shadow-2xl overflow-hidden"
          >
            {/* Top accent bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-prime via-gold to-prime" />

            {/* Header */}
            <div className="flex items-center justify-between px-8 pt-7 pb-4">
              <div className="flex items-center gap-2 text-xl font-black tracking-tighter">
                <div className="w-8 h-8 bg-prime text-gold rounded-full flex items-center justify-center">
                  <Home size={15} />
                </div>
                ESTATE<span className="text-gold font-light">CORE</span>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-prime transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex mx-8 mb-6 bg-gray-100 p-1 rounded-full">
              {['login', 'signup'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 py-2.5 rounded-full text-sm font-bold transition-all ${
                    tab === t
                      ? 'bg-prime text-white shadow-md'
                      : 'text-gray-500 hover:text-prime'
                  }`}
                >
                  {t === 'login' ? 'Login' : 'Sign Up'}
                </button>
              ))}
            </div>

            {/* Forms */}
            <div className="px-8 pb-8">
              <AnimatePresence mode="wait">
                {tab === 'login' ? (
                  <motion.form
                    key="login"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.25 }}
                    onSubmit={handleLoginSubmit}
                    className="space-y-4"
                  >
                    <div>
                      <p className="text-2xl font-black text-gray-900 mb-1">Welcome back</p>
                      <p className="text-sm text-gray-500">Sign in to your EstateCore account</p>
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        required
                        placeholder="Email address"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gold/60 focus:bg-white transition-all"
                      />
                    </div>

                    {/* Password */}
                    <div className="relative">
                      <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="Password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        className="w-full pl-10 pr-12 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gold/60 focus:bg-white transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-prime transition-colors"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>

                    <div className="flex justify-end">
                      <button type="button" className="text-xs font-semibold text-gold hover:underline">
                        Forgot password?
                      </button>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full bg-prime text-white py-4 rounded-2xl font-black text-sm tracking-wide hover:bg-gray-800 transition-colors shadow-lg shadow-prime/20"
                    >
                      Login to Account
                    </motion.button>

                    <Divider />

                    <GoogleButton />

                    <p className="text-center text-xs text-gray-400 mt-2">
                      Don't have an account?{' '}
                      <button
                        type="button"
                        onClick={() => setTab('signup')}
                        className="text-gold font-bold hover:underline"
                      >
                        Sign Up
                      </button>
                    </p>
                  </motion.form>
                ) : (
                  <motion.form
                    key="signup"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    onSubmit={handleSignupSubmit}
                    className="space-y-3.5"
                  >
                    <div>
                      <p className="text-2xl font-black text-gray-900 mb-1">Create account</p>
                      <p className="text-sm text-gray-500">Join thousands of property seekers</p>
                    </div>

                    {/* Full Name */}
                    <div className="relative">
                      <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        required
                        placeholder="Full name"
                        value={signupData.fullName}
                        onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                        className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gold/60 focus:bg-white transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        required
                        placeholder="Email address"
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gold/60 focus:bg-white transition-all"
                      />
                    </div>

                    {/* Phone + City side by side */}
                    <div className="flex gap-3">
                      <div className="relative flex-1">
                        <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="tel"
                          placeholder="Phone"
                          value={signupData.phone}
                          onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                          className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gold/60 focus:bg-white transition-all"
                        />
                      </div>
                      <div className="relative flex-1">
                        <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          placeholder="City"
                          value={signupData.city}
                          onChange={(e) => setSignupData({ ...signupData, city: e.target.value })}
                          className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gold/60 focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    {/* Role selector */}
                    <div className="flex bg-gray-100 p-1 rounded-2xl gap-1">
                      {[
                        { value: 'buyer', label: '🏠 Buyer / Renter' },
                        { value: 'seller', label: '📋 Seller / Agent' },
                      ].map((r) => (
                        <button
                          key={r.value}
                          type="button"
                          onClick={() => setSignupData({ ...signupData, role: r.value })}
                          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                            signupData.role === r.value
                              ? 'bg-white shadow text-prime'
                              : 'text-gray-500'
                          }`}
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>

                    {/* Password */}
                    <div className="relative">
                      <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="Create password"
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                        className="w-full pl-10 pr-12 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gold/60 focus:bg-white transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-prime transition-colors"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>

                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      By signing up, you agree to our{' '}
                      <span className="text-gold font-semibold cursor-pointer hover:underline">Terms of Service</span>{' '}
                      and{' '}
                      <span className="text-gold font-semibold cursor-pointer hover:underline">Privacy Policy</span>.
                    </p>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full bg-prime text-white py-4 rounded-2xl font-black text-sm tracking-wide hover:bg-gray-800 transition-colors shadow-lg shadow-prime/20"
                    >
                      Create Account
                    </motion.button>

                    <Divider />

                    <GoogleButton />

                    <p className="text-center text-xs text-gray-400 mt-2">
                      Already have an account?{' '}
                      <button
                        type="button"
                        onClick={() => setTab('login')}
                        className="text-gold font-bold hover:underline"
                      >
                        Login
                      </button>
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Divider = () => (
  <div className="flex items-center gap-3 my-1">
    <div className="flex-1 h-px bg-gray-100" />
    <span className="text-xs text-gray-400 font-medium">or continue with</span>
    <div className="flex-1 h-px bg-gray-100" />
  </div>
);

const GoogleButton = () => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    type="button"
    className="w-full flex items-center justify-center gap-3 py-3.5 border border-gray-200 rounded-2xl text-sm font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all"
  >
    <svg width="18" height="18" viewBox="0 0 18 18">
      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
      <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z"/>
    </svg>
    Sign in with Google
  </motion.button>
);

export default AuthModal;
