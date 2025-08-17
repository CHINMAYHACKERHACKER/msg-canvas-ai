import React, { useState } from 'react';
import { Eye, EyeOff, Bot, Mail, Lock, ArrowRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { handleLogin } from '@/AxiosRequest/HandleAxiosRequest';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeToggle } from '@/components/ThemeToggle';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { theme } = useTheme();
    const { login } = useAuth();
    const { state } = useLocation();
    const from = state?.from?.pathname || '/app';

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password) {
            newErrors.password = 'Password must be at least 6 characters';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsLoading(true);

        try {
            let loginResponse = await handleLogin(formData)
            if (loginResponse && loginResponse?.data && loginResponse?.data?.status) {
                setIsLoading(false);
                
                // Extract tokens from the response
                const accessToken = loginResponse.data.accessToken
                
                if (!accessToken) {
                    return;
                }
                
                // Login user through auth context with token only
                try {
                    login(accessToken);
                    
                    // Navigate to intended destination or dashboard
                    navigate(from, { replace: true });
                } catch (authError) {
                    setErrors({ general: 'Authentication failed. Please try again.' });
                }
            } else {
                setIsLoading(false);
                setErrors({ general: loginResponse?.data?.message || 'Login failed. Please try again.' });
            }
        } catch (error) {
            setIsLoading(false);
            setErrors({ general: 'Login failed. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    return (
        <div className={`h-screen overflow-hidden flex items-center justify-center p-4 transition-colors duration-300 ${
            theme === 'light' 
                ? 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50' 
                : 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900'
        }`}>
            {/* Theme Toggle - Top Right */}
            <div className="absolute top-4 right-4">
                <ThemeToggle size="md" />
            </div>

            <div className={`backdrop-blur-lg rounded-2xl shadow-2xl px-4 py-2 w-full max-w-sm border transition-all duration-300 ${
                theme === 'light'
                    ? 'bg-white/80 border-gray-200 shadow-lg'
                    : 'bg-white/10 border-white/20'
            }`}>
                {/* Header */}
                <div className="text-center mb-2">
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-2">
                        <Bot className="w-5 h-5 text-white" />
                    </div>
                    <h1 className={`text-xl font-bold mb-1 transition-colors duration-300 ${
                        theme === 'light' ? 'text-gray-900' : 'text-white'
                    }`}>
                        Welcome Back
                    </h1>
                    <p className={`text-xs transition-colors duration-300 ${
                        theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                    }`}>
                        Sign in to your AI Bot Builder account
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-2">
                    {errors.general && (
                        <div className={`border rounded-lg p-2 text-xs transition-colors duration-300 ${
                            theme === 'light'
                                ? 'bg-red-50 border-red-200 text-red-700'
                                : 'bg-red-500/20 border-red-500/50 text-red-200'
                        }`}>
                            {errors.general}
                        </div>
                    )}

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className={`block text-xs mb-1 transition-colors duration-300 ${
                            theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                        }`}>
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
                                theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                            }`} />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`w-full pl-10 pr-4 py-1.5 text-sm border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 ${
                                    theme === 'light'
                                        ? 'bg-white border-gray-300 text-gray-900 focus:border-purple-500'
                                        : 'bg-white/10 border-white/20 text-white focus:border-purple-500'
                                } ${errors.email ? 'border-red-500' : ''}`}
                                placeholder="Enter your email"
                            />
                        </div>
                        {errors.email && <p className={`mt-1 text-xs transition-colors duration-300 ${
                            theme === 'light' ? 'text-red-600' : 'text-red-400'
                        }`}>{errors.email}</p>}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className={`block text-xs mb-1 transition-colors duration-300 ${
                            theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                        }`}>
                            Password
                        </label>
                        <div className="relative">
                            <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
                                theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                            }`} />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className={`w-full pl-10 pr-10 py-1.5 text-sm border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 ${
                                    theme === 'light'
                                        ? 'bg-white border-gray-300 text-gray-900 focus:border-purple-500'
                                        : 'bg-white/10 border-white/20 text-white focus:border-purple-500'
                                } ${errors.password ? 'border-red-500' : ''}`}
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                                    theme === 'light' ? 'text-gray-500 hover:text-gray-700' : 'text-gray-400 hover:text-gray-300'
                                }`}
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                        {errors.password && <p className={`mt-1 text-xs transition-colors duration-300 ${
                            theme === 'light' ? 'text-red-600' : 'text-red-400'
                        }`}>{errors.password}</p>}
                    </div>

                    {/* Forgot Password */}
                    <div className="text-right">
                        <button
                            type="button"
                            className={`text-xs transition-colors duration-300 ${
                                theme === 'light' ? 'text-purple-600 hover:text-purple-700' : 'text-purple-300 hover:text-purple-200'
                            }`}
                            onClick={() => navigate('/forgot-password')}
                        >
                            Forgot password?
                        </button>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-1.5 px-4 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm"
                    >
                        {isLoading ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        ) : (
                            <>
                                <span>Sign In</span>
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-3 text-center">
                    <p className={`text-xs transition-colors duration-300 ${
                        theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                    }`}>
                        Don't have an account?{' '}
                        <button
                            onClick={() => navigate('/signup')}
                            className={`font-semibold transition-colors duration-300 ${
                                theme === 'light' ? 'text-purple-600 hover:text-purple-700' : 'text-purple-300 hover:text-purple-200'
                            }`}
                        >
                            Sign up
                        </button>
                    </p>
                </div>

                {/* Features Preview */}
                <div className={`mt-3 pt-2 border-t transition-colors duration-300 ${
                    theme === 'light' ? 'border-gray-200' : 'border-white/20'
                }`}>
                    <p className={`text-xs text-center mb-2 transition-colors duration-300 ${
                        theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                        What you can build:
                    </p>
                    <div className={`flex justify-center space-x-4 text-xs transition-colors duration-300 ${
                        theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                    }`}>
                        <span>🤖 AI Bots</span>
                        <span>📝 Templates</span>
                        <span>📊 Campaigns</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;