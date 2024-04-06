import axios from "axios";
import * as toast from "react-dom/test-utils";
export const api = axios.create({
    baseURL: "http://localhost:3000/api",
});


// refreshToken if status is 401 authorized
api.interceptors.response.use((response) =>{
    return response;
}, async function (error){
    const originalRequest = error.config;

    if(error.status === 401 && !originalRequest._retry){
        originalRequest._retry = true;
        const res = await api.post("/auth/refresh");

        localStorage.setItem("access_token", res.data.newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${res.data.newAccessToken}`;
        return api(originalRequest);
    }
    return Promise.reject(error);
})


export function getHeaders() {
    const token = localStorage.getItem("access_token");
    return {
        Authorization: `Bearer ${token}`
    }
}

export async function login(username, password) {
    try{
        const response = await api.post("/auth/login", {
            userName: username,
            password: password
        });
        console.log(response.data)
        return response.data;
    }catch (e){
        console.log(e.message)
        throw new Error("Error logging in");
    }
}

export async function signup(userInfo) {
    try{
        const response = await api.post("/auth/signup", userInfo);
            console.log(response.data)
            return response.data;
    }catch (error){
        console.log(error.message)
        throw new Error("Error signing up");
    }
}

export async function logout() {
    try{
        await api.post("/auth/logout");
        localStorage.removeItem("access_token");
        localStorage.removeItem("chat_user");
    }catch (e){
        console.log(e.message)
        throw new Error("Error logging out");
    }
}




