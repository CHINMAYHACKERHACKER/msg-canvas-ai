import { baseUrl } from "./AxiosBaseUrl";
import { axiosRequestPost } from "./MainAxiosRequest";

const handleSignup = async (data) => {
    try {
        let signUpResponse = await axiosRequestPost({
            method: 'POST',
            url: `${baseUrl}/user/sign-up`,
            data: data,
            params: {}
        });
        return signUpResponse;
    } catch (error) {
        console.error('Error in handleSignup function:', error.message);
    }
}

const handleLogin = async (data) => {
    try {
        let loginResponse = await axiosRequestPost({
            method: 'POST',
            url: `${baseUrl}/user/login`,
            data: data,
            params: {}
        })
        return loginResponse;
    } catch (error) {
        console.error('Error in handleSignup function:', error.message);
    }
}

const removeToken = async () => {
    try {
        // Remove tokens from localStorage for web
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
    } catch (error) {
        console.error('Error in removeToken function:', error.message);
    }
}

const getUserListData = async (reqObj) => {
    try {
        let userListRes = await axiosRequestPost({
            method: 'POST',
            url: `${baseUrl}/user/get-all-users`,
            data: reqObj,
            params: {}
        })
        if (userListRes && userListRes?.data) {
            return userListRes?.data;
        }
    } catch (error) {
        console.error('Error in Getting User List function:', error.message);
    }
}

const handleForgotPassword = async (data) => {
    try {
        let forgotPasswordRes = await axiosRequestPost({
            method: 'POST',
            url: `${baseUrl}/user/forgot-password`,
            data: data,
            params: {}
        })
        return forgotPasswordRes;
    } catch (error) {
        console.error('Error in handleForgotPassword function:', error.message);
    }
}


export {
    handleSignup,
    handleLogin,
    removeToken,
    getUserListData,
    handleForgotPassword
}