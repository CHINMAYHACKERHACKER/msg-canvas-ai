import React, { useState } from 'react';
import { Bot, Mail, User, ArrowRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { handleSignup } from '@/AxiosRequest/HandleAxiosRequest';
import { useTheme } from '@/contexts/ThemeContext';
import { ThemeToggle } from '@/components/ThemeToggle';

const Signup = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: ''
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const { theme } = useTheme();

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        else if (formData.fullName.trim().length < 2) newErrors.fullName = 'Name must be at least 2 characters';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) newErrors.email = 'Please enter a valid email address';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsLoading(true);
        try {
            let reqObj = {
                name: formData.fullName,
                email: formData.email
            }
            let signupResponse = await handleSignup(reqObj);
            if (signupResponse && signupResponse?.data && signupResponse?.data?.status && signupResponse?.data?.Email == 200) {
                setIsLoading(false);
                setSuccessMessage("Account created successfully. A secure password has been sent to your email. Please check your inbox and store it safely.");
            } else {
                setIsLoading(false);
                setErrors({ general: signupResponse?.data?.message });
            }
        } catch {
            setIsLoading(false);
            setErrors({ general: 'Account creation failed. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
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

            <div className={`backdrop-blur-lg rounded-2xl shadow-2xl px-4 py-6 w-full max-w-sm border transition-all duration-300 ${
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
                        Create Account
                    </h1>
                    <p className={`text-xs transition-colors duration-300 ${
                        theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                    }`}>
                        Start building AI-powered solutions
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-2">
                    {errors.general && (
                        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-2 text-red-200 text-xs">
                            {errors.general}
                        </div>
                    )}

                    {successMessage && (
                        <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-2 text-green-200 text-xs">
                            {successMessage}
                        </div>
                    )}

                    {/* Full Name */}
                    <div>
                        <label htmlFor="fullName" className={`block text-xs mb-1 transition-colors duration-300 ${
                            theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                        }`}>
                            Full Name
                        </label>
                        <div className="relative">
                            <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
                                theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                            }`} />
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                className={`w-full pl-10 pr-4 py-1.5 border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm transition-all duration-300 ${
                                    theme === 'light'
                                        ? 'bg-white border-gray-300 text-gray-900 focus:border-purple-500'
                                        : 'bg-white/10 border-white/20 text-white focus:border-purple-500'
                                } ${errors.fullName ? 'border-red-500' : ''}`}
                                placeholder="Your name"
                            />
                        </div>
                        {errors.fullName && <p className="text-xs text-red-400 mt-1">{errors.fullName}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className={`block text-xs mb-1 transition-colors duration-300 ${
                            theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                        }`}>
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
                                theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                            }`} />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`w-full pl-10 pr-4 py-1.5 border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm transition-all duration-300 ${
                                    theme === 'light'
                                        ? 'bg-white border-gray-300 text-gray-900 focus:border-purple-500'
                                        : 'bg-white/10 border-white/20 text-white focus:border-purple-500'
                                } ${errors.email ? 'border-red-500' : ''}`}
                                placeholder="your.email@example.com"
                            />
                        </div>
                        {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
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
                                <span>Create Account</span>
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
                        Already have an account?{' '}
                        <button
                            onClick={() => navigate('/')}
                            className={`font-semibold transition-colors duration-300 ${
                                theme === 'light' ? 'text-purple-600 hover:text-purple-700' : 'text-purple-300 hover:text-purple-200'
                            }`}
                        >
                            Sign in
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

export default Signup;