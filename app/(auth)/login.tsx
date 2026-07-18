import { useAuthStore } from '@/src/store/auth.store'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
    const { login, isLoading, error, clearError } = useAuthStore()

    return (
        <SafeAreaView className='flex-1 bg-[#0A0A0F]'>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className='flex-1'>
                <ScrollView
                    className='flex-1'
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps='handled'
                >
                    <View className='flex-1 px-6 pt-8 pb-10'>
                        <View>
                            <View className='flex-row items-center mb-10'>
                                <View className='w-8 h-8 rounded-lg bg-[#E8500A] items-center justify-center mr-2'>
                                    <Text className='text-white font-bold text-sm' >D</Text>
                                </View>
                                <Text className='text-white font-bold text-lg tracking-wider'>Drive India</Text>
                            </View>
                            <Text className='text-[#9494A8] font-medium text-sm tracking-[3px] uppercase mb-3'>Welcome Back</Text>
                            <Text className='text-white font-bold text-5xl leading-tight'>Sign In to {'\n'}Your Account</Text>
                        </View>

                        {
                            error && (
                                <View className='bg-[#FF4D4D15] rounded-lg p-4 mt-6'>
                                    <Text className='text-[#FF4D4D] font-medium text-sm '>{error}</Text>
                                </View>
                            )
                        }

                        <View className='mb-6' mt-5 style={{ gap: 16 }}>
                            <View>
                                <Text className='text-[#9494A8] text-xs font font-semibold tracking-widest uppercase mb-2 '>Email Address</Text>
                                <View className={`flex-row items-center bg-[#13131A] border ${errors.email ? 'border-[#FF4D4D]' : 'border-[#22222E]'} rounded-2xl px-5 py-4`}>
                                    <TextInput
                                        placeholder='you@exmaple.com'
                                        placeholderTextColor={'#5A5A72'}
                                        keyboardType='email-address'
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        autoComplete='email'
                                        value={email}
                                        onChangeText={setEmail}
                                        className='flex-1 text-white text-base'
                                    />
                                </View>
                                {errors.email && <Text className='text-red-500 text-xs mt-1 ml-1'>{errors.email}</Text>}
                            </View>
                            <View>
                                <Text className='text-[#9494A8] text-xs font font-semibold tracking-widest uppercase mb-2 '>Password</Text>
                                <View className={`flex-row items-center bg-[#13131A] border ${errors.email ? 'border-[#FF4D4D]' : 'border-[#22222E]'} rounded-2xl px-5 py-4`}>
                                    <TextInput
                                        placeholder='Minimum 8 characters'
                                        placeholderTextColor={'#5A5A72'}
                                        secureTextEntry={!showPassword}
                                        keyboardType='default'
                                        autoCapitalize='none'
                                        autoComplete='password'
                                        value={password}
                                        onChangeText={setPassword}
                                        className='flex-1 text-white text-base'
                                    />
                                    <TouchableOpacity className='ml-3 px-2 py-1' onPress={() => setShowPassword(!showPassword)}>
                                        <Text className='text-[#5A5A72] text-xs font-semibold tracking-wider uppercase'>
                                            {showPassword ? 'Hide' : 'Show'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                {errors.password && <Text className='text-red-500 text-xs mt-1 ml-1'>{errors.password}</Text>}
                            </View>
                        </View>

                        <TouchableOpacity
                            className='bg-[#E8500A] rounded-2xl py-3 items-center mb-5'
                            disabled={isLoading}
                            activeOpacity={0.8}>
                            {
                                isLoading ? (
                                    <ActivityIndicator size="small" color="#fff" />
                                ) : (
                                    <View className='bg-[#E8500A] rounded-2xl py-4 items-center'>
                                        <Text className='text-white font-bold text-sm tracking-widest uppercase'>Sign In</Text>
                                    </View>
                                )
                            }
                        </TouchableOpacity>

                        <View className='flex-row items-center mb-5'>
                            <View className='flex-1 h-px bg-[#22222E]' />
                            <Text className='text-[#5A5A72] text-sm mx-2'>OR</Text>
                            <View className='flex-1 h-px bg-[#22222E]' />
                        </View>

                        <TouchableOpacity onPress={() => router.push('/(auth)/register')} activeOpacity={0.85} className='border border-[#22222E] rounded-2xl py-5 items-center'>
                            <Text className='text-white text-sm font-semibold tracking-wider uppercase'>Create Account</Text>
                        </TouchableOpacity>

                        <Text className='text-[#5A5A72] text-xs text-center mt-8'>
                            By continuing, you agree to our{' '}
                            <Text className='underline'>Terms of Service</Text> and{' '}
                            <Text className='underline'>Privacy Policy</Text>.
                        </Text>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default login

const styles = StyleSheet.create({})