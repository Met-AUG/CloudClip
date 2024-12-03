import axios from "axios";

const baseUrl = window.location.protocol === 'https:' 
    ? process.env.VUE_APP_HTTPS_URL 
    : process.env.VUE_APP_BASE_URL;

export const request = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
});

request.interceptors.request.use(config => {
    return config;
}, err => {
    return Promise.reject(err);
});

request.interceptors.response.use(response => {
    return response;
}, err => {
    return Promise.reject(err);
});

export default request;