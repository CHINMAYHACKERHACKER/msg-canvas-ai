# MSG Canvas AI - Theme System

This project now includes a comprehensive light and dark theme system that works across all pages and components.

## Features

- **Light Mode**: Clean, bright interface with subtle shadows and borders
- **Dark Mode**: Dark interface with glassmorphism effects
- **System Preference**: Automatically matches your operating system theme
- **Persistent**: Theme choice is saved in localStorage
- **Smooth Transitions**: All theme changes include smooth color transitions

## Route Protection System

The application now includes a robust route protection system that ensures only authenticated users can access protected routes.

### 🔑 **JWT-Based Authentication**

The system uses JWT (JSON Web Tokens) for secure authentication:

- **Access Token**: Contains user claims and is used for API requests
- **Refresh Token**: Used only for getting new access tokens
- **User Information**: Automatically extracted from access token claims

#### **Token Structure**
Your access token should contain these claims:
```json
{
  "sub": "user-id-123",
  "accountOwnerId": "9b09a17f-b87f-4339-9e26-b1844f449e6d",
  "role": "account_owner",
  "userName": "chinmay",
  "email": "chinmay@example.com",
  "name": "Chinmay",
  "iat": 1640995200,
  "exp": 1640998800
}
```

#### **API Response Format**
Your login API should return:
```json
{
  "data": {
    "status": true,
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "message": "Login successful"
  }
}
```

### 🔒 Protected Routes
- `/app/*` - All dashboard and application routes
- `/dashboard` - Main dashboard
- `/bots` - AI bots management
- `/templates` - Template management
- `/campaigns` - Campaign management
- `/analytics` - Analytics and reports
- `/settings` - User settings and preferences

### 🌐 Public Routes
- `/` - Login page
- `/signup` - User registration
- `/forgot-password` - Password recovery

### 🛡️ Security Features
- **Authentication Required**: Protected routes automatically redirect to login
- **JWT Token Validation**: Automatic token validation and expiration checking
- **Token Refresh**: Automatic refresh when tokens expire soon
- **Session Management**: Secure session handling with localStorage/sessionStorage
- **Unauthorized Access Logging**: Logs all unauthorized access attempts
- **Automatic Logout**: Invalid tokens automatically log out users
- **Route Guarding**: Prevents direct URL access to protected routes

### 🔐 Authentication Flow
1. **Login**: User authenticates and receives access + refresh tokens
2. **Token Decoding**: User information automatically extracted from access token
3. **Route Access**: Protected routes check authentication status
4. **Token Refresh**: Automatic refresh when access token expires soon
5. **Logout**: User logs out and all data is cleared
6. **Redirect**: Unauthorized users are redirected to login

### 🚫 Unauthorized Access Prevention
- Direct URL typing in browser is blocked
- Browser refresh on protected routes is handled
- Invalid tokens automatically redirect to login
- Session persistence across browser tabs
- JWT expiration automatically handled

### ⚠️ **Important Notes**

1. **Use Access Token for User Info**: Never decode refresh tokens for user information
2. **Token Claims**: Include all necessary user data in access token claims
3. **Security**: Access tokens should have short expiration (15-60 minutes)
4. **Refresh Logic**: Implement proper refresh token logic in your backend
5. **Token Storage**: Tokens are stored securely in localStorage/sessionStorage

## How to Use

### For Users

1. **Theme Toggle Button**: Click the sun/moon icon in the top-right corner of any authentication page
2. **Header Toggle**: Use the theme toggle in the main application header
3. **Settings Page**: Go to Settings → Appearance to choose between Light, Dark, or System preference
4. **Authentication**: Login required to access dashboard and features
5. **Logout**: Use the logout button in header or settings

### For Developers

#### Using the Auth Hook

```tsx
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, logout } = useAuth();
  
  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user?.name}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
}
```

#### Adding Route Protection

```tsx
import { ProtectedRoute } from '@/components/ProtectedRoute';

<Route path="/protected" element={
  <ProtectedRoute>
    <ProtectedComponent />
  </ProtectedRoute>
} />
```

#### Adding Public Route Protection

```tsx
import { PublicRoute } from '@/components/PublicRoute';

<Route path="/login" element={
  <PublicRoute>
    <LoginComponent />
  </PublicRoute>
} />
```

#### Theme-Aware Styling

Use conditional classes based on the current theme:

```tsx
const { theme } = useTheme();

<div className={`transition-colors duration-300 ${
  theme === 'light' 
    ? 'bg-white text-gray-900 border-gray-200' 
    : 'bg-gray-900 text-white border-gray-700'
}`}>
  Content
</div>
```

## CSS Variables

The theme system uses CSS custom properties defined in `src/index.css`:

- `--background`: Main background color
- `--foreground`: Main text color
- `--card`: Card background color
- `--border`: Border colors
- `--primary`: Primary accent color
- `--muted`: Muted text and background colors

## Components Updated

- ✅ Login page
- ✅ Signup page  
- ✅ Forgot Password page
- ✅ Header component
- ✅ Settings page (with theme controls)
- ✅ All pages now use theme-aware styling
- ✅ Route protection system implemented
- ✅ Authentication context and hooks
- ✅ Protected and public route components

## Theme Persistence

- Theme choice is automatically saved to localStorage
- System preference is detected on first visit
- Theme persists across browser sessions
- Users can override system preference

## Authentication Persistence

- User sessions are saved to localStorage/sessionStorage
- Automatic token validation and refresh
- Secure logout with data clearing
- Session persistence across browser tabs

## Browser Support

- Modern browsers with CSS custom properties support
- Automatic fallback to light theme for older browsers
- Responsive design works in both themes
- Route protection works in all modern browsers

## Customization

To add new theme-aware components:

1. Import the `useTheme` hook
2. Use conditional classes based on `theme` value
3. Add smooth transitions with `transition-colors duration-300`
4. Test in both light and dark modes

To add new protected routes:

1. Wrap the route with `<ProtectedRoute>`
2. Ensure the route is included in the protected routes list
3. Test unauthorized access prevention

## Example Theme-Aware Component

```tsx
import { useTheme } from '@/contexts/ThemeContext';

export function ThemeAwareCard({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  
  return (
    <div className={`p-6 rounded-lg border transition-all duration-300 ${
      theme === 'light'
        ? 'bg-white border-gray-200 shadow-lg'
        : 'bg-white/10 border-white/20 backdrop-blur-lg'
    }`}>
      {children}
    </div>
  );
}
```

## Security Best Practices

- Always use `<ProtectedRoute>` for sensitive content
- Implement proper token validation in production
- Use HTTPS in production environments
- Regularly rotate authentication tokens
- Log unauthorized access attempts
- Implement rate limiting for authentication endpoints
