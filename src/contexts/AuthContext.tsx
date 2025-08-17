import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { 
  clearAuthData, 
  storeUserData, 
  getStoredUserData,
  extractUserFromToken
} from '@/utils/authUtils';

interface User {
  id: string;
  accountOwnerId: string;
  role: string;
  userName: string;
  email?: string;
  name: string;
  exp?: number;
  iat?: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (accessToken: string) => void;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  // Check if user is authenticated on app load
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = useCallback(async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Check if tokens exist in sessionStorage
      const accessToken = sessionStorage.getItem('accessToken');
      const refreshToken = sessionStorage.getItem('refreshToken');
      
      if (!accessToken || !refreshToken) {
        // No tokens found, clear everything and logout
        clearAuthData();
        setUser(null);
        return false;
      }
      
      // Get stored user data from sessionStorage
      const { userData } = getStoredUserData();
      
      if (userData) {
        try {
          // Parse stored user data
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          return true;
        } catch (error) {
          // Invalid user data, clear it
          clearAuthData();
          setUser(null);
          return false;
        }
      } else {
        // No user data stored
        setUser(null);
        return false;
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    // Clear all session storage
    sessionStorage.clear();
    
    // Clear localStorage except theme
    const theme = localStorage.getItem('theme');
    localStorage.clear();
    if (theme) {
      localStorage.setItem('theme', theme);
    }
    
    // Clear user state
    setUser(null);
    console.log('User logged out successfully');
  }, []);

  const login = useCallback((accessToken: string) => {
    try {
      // Extract user information from the access token
      const userData = extractUserFromToken(accessToken);
      
      if (!userData) {
        throw new Error('Invalid access token: unable to extract user information');
      }

      // Store user data in sessionStorage for security
      storeUserData(JSON.stringify(userData));
      setUser(userData);
      
      console.log('User logged in successfully:', userData);
    } catch (error) {
      console.error('Login failed:', error);
      clearAuthData();
      setUser(null);
      throw error;
    }
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
