// Utility functions for authentication and security

/**
 * Check if a route requires authentication
 */
export const isProtectedRoute = (pathname: string): boolean => {
  const protectedRoutes = ['/app', '/dashboard', '/bots', '/templates', '/campaigns', '/analytics', '/settings'];
  return protectedRoutes.some(route => pathname.startsWith(route));
};

/**
 * Check if a route is public (authentication pages)
 */
export const isPublicRoute = (pathname: string): boolean => {
  const publicRoutes = ['/', '/signup', '/forgot-password'];
  return publicRoutes.includes(pathname);
};

/**
 * Decode JWT token without external libraries
 */
export const decodeJWT = (token: string): any => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('JWT decode failed:', error);
    return null;
  }
};

/**
 * Extract user information from access token
 */
export const extractUserFromToken = (accessToken: string): any => {
  try {
    const decoded = decodeJWT(accessToken);
    if (!decoded) return null;

    // Extract user information from token claims
    return {
      id: decoded.sub || decoded.userId || decoded.id,
      accountOwnerId: decoded.accountOwnerId,
      role: decoded.role,
      userName: decoded.userName,
      email: decoded.email,
      name: decoded.name || decoded.userName,
      // Add other claims as needed
      exp: decoded.exp,
      iat: decoded.iat
    };
  } catch (error) {
    console.error('Failed to extract user from token:', error);
    return null;
  }
};

/**
 * Clear all authentication data
 */
export const clearAuthData = (): void => {
  sessionStorage.removeItem('userData');
  // Keep theme preference in localStorage
  // localStorage.removeItem('theme');
};

/**
 * Get stored user data
 */
export const getStoredUserData = (): { 
  userData: string | null; 
} => {
  return {
    userData: sessionStorage.getItem('userData')
  };
};

/**
 * Store user data
 */
export const storeUserData = (userData: string): void => {
  // Always store userData in sessionStorage for security
  sessionStorage.setItem('userData', userData);
};

/**
 * Check if user should be redirected after login
 */
export const getRedirectPath = (from: string | null): string => {
  if (!from || from === '/' || isPublicRoute(from)) {
    return '/app';
  }
  return from;
};

/**
 * Get token expiration time in human readable format
 */
export const getTokenExpirationTime = (token: string): string => {
  try {
    const decoded = decodeJWT(token);
    if (!decoded || !decoded.exp) return 'Unknown';
    
    const expirationDate = new Date(decoded.exp * 1000);
    return expirationDate.toLocaleString();
  } catch (error) {
    return 'Unknown';
  }
};
