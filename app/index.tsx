import { useAuthStore } from "@/src/store/auth.store";
import { router } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";


export default function Index() {
    const { loadUser } = useAuthStore()

    useEffect(() => {
        checkAuth()
    }, [])

    const checkAuth = async () => {
        const token = await SecureStore.getItemAsync("accessToken")
        if (token) {
            await loadUser()
            console.log("user loaded")
            router.replace("/(main)/home" as any)
        } else {
            router.replace("/(auth)/onboarding" as any)
        }
    }

    return (
        <View className="flex-1 bg-[#0a0a00f] justify-center items-center">
            <ActivityIndicator color="#E8500A" size="large" />
        </View>
    )
}