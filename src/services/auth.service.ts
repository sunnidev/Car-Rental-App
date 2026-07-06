import * as SecureStore from 'expo-secure-store'
import { api } from "../lib/axios"
import { LoginResponse } from "../types"


export const authService = {
    async register(data: {
        email: string,
        password: string,
        phone: string
        firstName: string,
        lastName: string
    }): Promise<LoginResponse> {
        const result = await api.post("/auth/register", data);
        await authService.saveTokens(
            result.data.data.accessToken,
            result.data.data.refreshToken
        )
        return result.data.data
    },

    async login(email: string, password: string): Promise<LoginResponse> {
        const result = await api.post("/auth/login", { email, password });
        await authService.saveTokens(
            result.data.data.accessToken,
            result.data.data.refreshToken
        )
        return result.data.data
    },

    async logout(): Promise<void> {
        const refreshToken = await SecureStore.getItemAsync("refreshToken")
        if (refreshToken) {
            await api.post("/auth/logout", { refreshToken }).catch(() => { })
        }
        await SecureStore.deleteItemAsync("refreshToken")
        await SecureStore.deleteItemAsync("accessToken")
    },


    async saveTokens(accessToken: string, refreshToken: string): Promise<void> {
        await SecureStore.setItemAsync("accessToken", accessToken)
        await SecureStore.setItemAsync("refreshToken", refreshToken)
    },

    async getStoredToken() {
        const accessToken = await SecureStore.getItemAsync("accessToken")
        const refreshToken = await SecureStore.getItemAsync("refreshToken")
        return {
            accessToken,
            refreshToken
        }
    }
}