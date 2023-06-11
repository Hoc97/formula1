import axios from "axios";

const baseUrl = import.meta.env.VITE_APP_BACKEND_URL;
const instance = axios.create({
    baseURL: baseUrl
});


instance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});


instance.interceptors.response.use(function (response) {
    // return response && response.data ? response.data : response;
    return response;
}, async function (error) {

    return error?.response ?? Promise.reject(error);
});

export default instance;