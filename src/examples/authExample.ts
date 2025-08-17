// Example of how to handle authentication with JWT tokens

// Your API response format:
interface LoginResponse {
  data: {
    status: boolean;
    message?: string;
    accessToken: string;        // JWT access token
    refreshToken: string;       // JWT refresh token
    user?: {
      id: string;
      email: string;
      name: string;
    };
  };
}

// Example login function:
export const handleLoginExample = async (credentials: { email: string; password: string }) => {
  try {
    // Make API call to your backend
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (data.status && data.accessToken) {
      // Extract user information from the access token
      // The token contains: accountOwnerId, role, userName, etc.
      
      // Store tokens securely
      localStorage.setItem('authToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      
      // The user information is automatically extracted from the access token
      // No need to store user data separately
      
      return {
        success: true,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      };
    } else {
      throw new Error(data.message || 'Login failed');
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Example of how the access token should look:
export const exampleAccessToken = {
  // Header
  alg: "HS256",
  typ: "JWT",
  
  // Payload (this is what gets decoded)
  payload: {
    sub: "user-id-123",                    // Subject (user ID)
    accountOwnerId: "9b09a17f-b87f-4339-9e26-b1844f449e6d",
    role: "account_owner",
    userName: "chinmay",
    email: "chinmay@example.com",
    name: "Chinmay",
    iat: 1640995200,                       // Issued at
    exp: 1640998800,                       // Expires at (1 hour later)
  },
  
  // Signature
  signature: "..." // HMAC SHA256 signature
};

// Key points:
// 1. User information comes from the ACCESS TOKEN, not refresh token
// 2. Refresh token should only be used to get new access tokens
// 3. Access token contains all user claims (accountOwnerId, role, userName)
// 4. The system automatically decodes and extracts user info from the access token
// 5. No need to manually create user objects - everything comes from the token
