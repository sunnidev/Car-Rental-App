import axios, { AxiosError } from 'axios'
import * as SecureStore from 'expo-secure-store'
import { API_BASE_URL } from '../constants'

export const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
})


api.interceptors.request.use(
    async (config) => {
        const token = await SecureStore.getItemAsync("accessToken")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

api.interceptors.response.use((res) => res, async (error: AxiosError) => {
    const original = error.config as any;
    if (error?.response?.status == 401 && !original._retry) {
        original._retry = true;
    }
    try {
        const refreshToken = await SecureStore.getItemAsync("refreshToken");
        if (!refreshToken) throw new Error("No refresh_token")

        const { data } = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken
        });

        const { accessToken, refreshToken: newRefresh } = data.data;

        await SecureStore.setItemAsync("accessToken", accessToken);
        await SecureStore.setItemAsync("refreshToken", newRefresh);
        original.headers.Authorization = `Bearer ${accessToken}`;
        return api(original);

    } catch {
        await SecureStore.deleteItemAsync("accessToken");
        await SecureStore.deleteItemAsync("refreshToken");
    }
})