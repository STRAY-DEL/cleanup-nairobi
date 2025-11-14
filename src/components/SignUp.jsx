import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Leaf, MapPin, Mail, Lock, User, Phone, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const SignUp = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    confirmEmail: '',
    phone: '',
    password: '',
    confirmPassword: '',
    location: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [errors, setErrors] = useState({});
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nairobiLocations = [
    'Westlands',
    'Kilimani',
    'Parklands',
    'Lavington',
    'Karen',
    'Runda',
    'Kileleshwa',
    'South B',
    'South C',
    'Langata',
    'Kasarani',
    'Embakasi',
    'Ruaraka',
    'Dagoretti',
    'Kibera',
    'Mathare',
    'Eastleigh',
    'Ngara',
    'Pangani',
    'Huruma'
  ];

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    return strength;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.confirmEmail.trim()) {
      newErrors.confirmEmail = 'Please confirm your email';
    } else if (formData.email !== formData.confirmEmail) {
      newErrors.confirmEmail = 'Emails do not match';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.location) {
      newErrors.location = 'Please select your location';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Determine API base (use Vite env if available, otherwise default to localhost:5000)
      const API_BASE = import.meta.env.VITE_API_URL || `${window.location.protocol}//${window.location.hostname}:5000`;

      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        location: formData.location
      };

      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        // Show server validation or error message
        const message = (data && data.message) || 'Registration failed';
        setErrors({ form: message });
        return;
      }

      // Successful registration: store token and user
      if (data && data.data) {
        const { token, user } = data.data;
        if (token) localStorage.setItem('token', token);
        if (user) {
          localStorage.setItem('userName', user.full_name || user.fullName || '');
          localStorage.setItem('userEmail', user.email || '');
          localStorage.setItem('userLocation', user.location || '');
        }
      }

      alert('Registration successful! Redirecting to dashboard...');
      navigate('/dashboard');
    } catch (err) {
      console.error('Registration error:', err);
      setErrors({ form: 'Registration failed. Please try again.' });
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return 'bg-red-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 1) return 'Weak';
    if (passwordStrength <= 3) return 'Medium';
    return 'Strong';
  };

  return (
    <div className="min-h-screen flex overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxMGI5ODEiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDI0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00ek0xMiAxNmMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHptMCAyNGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
        
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-700 p-2 rounded-lg">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-emerald-900">Cleanup</h1>
              <p className="text-lg font-semibold text-emerald-600">Nairobi</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-6xl font-bold text-emerald-900 leading-tight mb-4">
                Cleanup<br />Nairobi,
              </h2>
              <p className="text-xl text-emerald-700 max-w-md">
                Join our community of environmental champions making Nairobi cleaner and greener, one action at a time.
              </p>
            </div>

            {/* Illustration Placeholder */}
            <div className="relative h-64 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-200/50 to-transparent rounded-3xl"></div>
              <div className="relative flex items-center justify-center space-x-4">
                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center animate-bounce">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
                <div className="w-20 h-20 bg-teal-600 rounded-full flex items-center justify-center animate-pulse">
                  <MapPin className="w-10 h-10 text-white" />
                </div>
                <div className="w-16 h-16 bg-emerald-700 rounded-full flex items-center justify-center animate-bounce delay-100">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>

            <Link
              to="/"
              className="inline-block bg-emerald-800 hover:bg-emerald-900 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Sign Now
            </Link>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-20 right-20 w-32 h-32 bg-emerald-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 left-20 w-40 h-40 bg-teal-400/20 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Right Side - Sign Up Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div 
            onClick={() => navigate('/')} 
            className="lg:hidden flex items-center justify-center space-x-3 mb-8 cursor-pointer hover:opacity-80 transition-opacity duration-300"
          >
            <div className="bg-emerald-700 p-2 rounded-lg">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-emerald-900">Cleanup Nairobi</h1>
            </div>
          </div>

          {/* Sign Up Button (Top Right) */}
          <div className="flex justify-end">
            <button className="bg-emerald-800 hover:bg-emerald-900 text-white font-medium px-6 py-2 rounded-full text-sm transition-all duration-300">
              Sign up Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name,
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`w-full pl-12 pr-4 py-3 border ${errors.fullName ? 'border-red-500' : 'border-gray-200'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300`}
                />
              </div>
              {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`w-full pl-12 pr-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300`}
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            {/* Confirm Email */}
            <div>
              <label htmlFor="confirmEmail" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="confirmEmail"
                  name="confirmEmail"
                  type="email"
                  value={formData.confirmEmail}
                  onChange={handleChange}
                  placeholder="Confirm your email"
                  className={`w-full pl-12 pr-4 py-3 border ${errors.confirmEmail ? 'border-red-500' : 'border-gray-200'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300`}
                />
              </div>
              {errors.confirmEmail && <p className="mt-1 text-sm text-red-500">{errors.confirmEmail}</p>}
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone number
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className={`w-full pl-12 pr-4 py-3 border ${errors.phone ? 'border-red-500' : 'border-gray-200'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300`}
                />
              </div>
              {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className={`w-full pl-12 pr-12 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium text-gray-600">{getPasswordStrengthText()}</span>
                  </div>
                </div>
              )}
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className={`w-full pl-12 pr-12 py-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
            </div>

            {/* Location Dropdown */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Location in Nairobi
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                <button
                  type="button"
                  onClick={() => setIsLocationOpen(!isLocationOpen)}
                  className={`w-full pl-12 pr-12 py-3 border ${errors.location ? 'border-red-500' : 'border-gray-200'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 text-left ${!formData.location ? 'text-gray-400' : 'text-gray-900'}`}
                >
                  {formData.location || 'Select your location'}
                </button>
                <ChevronDown className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 transition-transform duration-300 ${isLocationOpen ? 'rotate-180' : ''}`} />
                
                {isLocationOpen && (
                  <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-2xl shadow-lg max-h-60 overflow-y-auto">
                    {nairobiLocations.map((location) => (
                      <button
                        key={location}
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, location }));
                          setIsLocationOpen(false);
                          if (errors.location) {
                            setErrors(prev => ({ ...prev, location: '' }));
                          }
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-emerald-50 transition-colors duration-200 first:rounded-t-2xl last:rounded-b-2xl"
                      >
                        {location}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? 'Creating Account...' : 'Sign up'}
            </button>
          </form>

          {/* Sign In Link */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/" className="font-semibold text-emerald-700 hover:text-emerald-800 transition-colors duration-300">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
