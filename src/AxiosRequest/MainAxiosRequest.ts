import axios from "axios";
import { isJwtExpired } from "jwt-check-expiration";

// Function to check if tokens exist and trigger logout if they don't
const checkTokensAndLogout = () => {
    // Skip token check for login/signup requests
    const currentPath = window.location.pathname;
    if (currentPath === '/' || currentPath === '/signup' || currentPath === '/forgot-password') {
        return true;
    }
    
    const accessToken = sessionStorage.getItem('accessToken');
    const refreshToken = sessionStorage.getItem('refreshToken');
    
    if (!accessToken || !refreshToken) {
        // Clear session storage
        sessionStorage.clear();
        // Clear localStorage except theme
        const theme = localStorage.getItem('theme');
        localStorage.clear();
        if (theme) {
            localStorage.setItem('theme', theme);
        }
        // Redirect to login page
        window.location.href = '/';
        return false;
    }
    return true;
};

const axiosRequestPost = async ({ method, url, data, params }) => {
    try {
        const response = await axios({
            method: method,
            url: url,
            headers: {
                'Content-Type': 'application/json',
            },
            data: data ? data : null,
            params: params ? params : null,
        });
        if (response?.data && response?.data?.accessToken) {
            sessionStorage.setItem('accessToken', response?.data?.accessToken);
        }
        if (response?.data && response?.data?.refreshToken) {
            sessionStorage.setItem('refreshToken', response?.data?.refreshToken);
        }
        return response;
    } catch (error) {
        console.error('Error in HttpRequest function:', error.message);
        return error;
    }
};

const axiosRequestGet = async ({ method, url }) => {
    try {
        const response = await axios({
            method: method,
            url: url,
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response;
    } catch (error) {
        console.error('Error in HttpRequestGet function:', error.message);
    }
};


const axiosRequestUploadPost = async ({ method, url, data }) => {
    try {
        const response = await axios({
            method: method,
            url: url,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: data ? data : null,
        });
        return response;
    } catch (error) {
        console.error('Error in HttpRequest function:', error.message);
    }
};

const getAccessToken = async () => {
    try {
        const accessToken = sessionStorage.getItem('accessToken');
        return accessToken;
    } catch (error) {
        // Handle error
        console.error('Error retrieving access token:', error);
        return null;
    }
};

// Function to retrieve refresh token
const getRefreshToken = async () => {
    try {
        const refreshToken = sessionStorage.getItem('refreshToken');
        return refreshToken;
    } catch (error) {
        // Handle error
        console.error('Error retrieving refresh token:', error);
        return null;
    }
};

axios.interceptors.request.use(
    async (config) => {
        // Check if tokens exist, if not, logout
        if (!checkTokensAndLogout()) {
            return Promise.reject(new Error('No tokens found, user logged out'));
        }
     
        let refreshToken = await getRefreshToken();

        if (refreshToken) {
            let isExpried = isJwtExpired(refreshToken);
            // console.log("isExpried", isExpried);
            if (isExpried) {
                // If the refresh token has expired, remove it
                config.headers.refreshtoken = null;
            } else {
                // If the refresh token is not expired, add it to the request headers
                config.headers.refreshtoken = refreshToken;
            }
        }

        // Get access token
        let accessToken = await getAccessToken();
        // If access token exists, add it to the request headers
        if (accessToken) {
            config.headers.Authorization = accessToken;
        }
        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    async (response) => {
        if (response?.data && response?.data?.refreshToken) {
            sessionStorage.setItem('refreshToken', response?.data?.refreshToken)
        }
        return response;
    },
    async (error) => {
        if (error.response && error.response.status === 401) {
            console.log('Unauthorized request, status code 401.');
            sessionStorage.removeItem('accessToken');
            sessionStorage.removeItem('refreshToken');

            return {
                data: error.response.data
            };
        }
        else if (error.response && error.response.status === 500) {
            sessionStorage.removeItem('accessToken');
            sessionStorage.removeItem('refreshToken');
            return {
                data: error.response.data
            };
        }
    }
);

export {
    axiosRequestPost,
    axiosRequestGet,
    getAccessToken,
    axiosRequestUploadPost,
    checkTokensAndLogout
}