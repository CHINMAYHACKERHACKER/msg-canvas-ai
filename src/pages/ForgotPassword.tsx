import React, { useState } from 'react';
import { Mail, ArrowRight, Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { ThemeToggle } from '@/components/ThemeToggle';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { theme } = useTheme();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!email.trim()) {
            setError('Email is required');
            return;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email');
            return;
        }

        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000)); // simulate API
            setSuccess('Password reset link sent to your email');
        } catch (err) {
            setError('Failed to send reset link. Try again later.');
        } finally {
            setIsLoading(false);
        }
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

            <div className={`backdrop-blur-lg rounded-2xl shadow-2xl px-4 py-3 w-full max-w-sm border transition-all duration-300 ${
                theme === 'light'
                    ? 'bg-white/80 border-gray-200 shadow-lg'
                    : 'bg-white/10 border-white/20'
            }`}>
                {/* Header */}
                <div className="text-center mb-3">
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-2">
                        <Bot className="w-5 h-5 text-white" />
                    </div>
                    <h1 className={`text-xl font-bold mb-1 transition-colors duration-300 ${
                        theme === 'light' ? 'text-gray-900' : 'text-white'
                    }`}>
                        Regenerate Password
                    </h1>
                    <p className={`text-xs transition-colors duration-300 ${
                        theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                    }`}>
                        We'll email you a new secure password
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3">
                    {error && (
                        <div className={`border rounded-lg p-2 text-xs transition-colors duration-300 ${
                            theme === 'light'
                                ? 'bg-red-50 border-red-200 text-red-700'
                                : 'bg-red-500/20 border-red-500/50 text-red-200'
                        }`}>
                            {error}
                        </div>
                    )}
                    {/* Success Message */}
                    {success && (
                        <div className={`border rounded-lg p-2 text-xs transition-colors duration-300 ${
                            theme === 'light'
                                ? 'bg-green-50 border-green-200 text-green-700'
                                : 'bg-green-500/20 border-green-500/50 text-green-200'
                        }`}>
                            A new secure password has been sent to your email.
                        </div>
                    )}

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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                autoComplete="off"
                                className={`w-full pl-10 pr-4 py-1.5 text-sm border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 ${
                                    theme === 'light'
                                        ? 'bg-white border-gray-300 text-gray-900 focus:border-purple-500'
                                        : 'bg-white/10 border-white/20 text-white focus:border-purple-500'
                                }`}
                            />
                        </div>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-1.5 px-4 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all disabled:opacity-50 flex items-center justify-center space-x-2 text-sm"
                    >
                        {isLoading ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        ) : (
                            <>
                                <span>Generate New Password</span>
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-3 text-center">
                    <p className={`text-xs transition-colors duration-300 ${
                        theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                    }`}>
                        Back to{' '}
                        <button 
                            onClick={() => navigate('/')} 
                            className={`font-semibold transition-colors duration-300 ${
                                theme === 'light' ? 'text-purple-600 hover:text-purple-700' : 'text-purple-300 hover:text-purple-200'
                            }`}
                        >
                            Sign In
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
