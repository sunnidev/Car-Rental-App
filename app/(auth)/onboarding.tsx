import { router } from 'expo-router'
import React, { useRef, useState } from 'react'
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const { width } = Dimensions.get('window')

const slides = [
  {
    id: '1',
    tag: 'WELCOME TO DRIVEINDIA',
    title: 'Drive Anywhere,\nAnytime.',
    subtitle: 'Premium self-drive cars available across Bengaluru, Mumbai & Hyderabad.',
    image: 'https://sslphotos.jato.com/PHOTO400/SSCIND/HYUNDAI/EXTER/2023/50D.JPG',
    accentClass: 'bg-[#E8500A]',
    accentText: 'text-[#E8500A]',
    btnClass: 'bg-[#E8500A]',
  },
  {
    id: '2',
    tag: 'EASY BOOKING',
    title: 'Book in Under\n60 Seconds.',
    subtitle: 'Choose your city, pick a location near you, select your car and go.',
    image: 'https://sslphotos.jato.com/PHOTO400/SSCIND/MARUTI%20SUZUKI/SWIFT/2023/5HA.JPG',
    accentClass: 'bg-[#00D4AA]',
    accentText: 'text-[#00D4AA]',
    btnClass: 'bg-[#00D4AA]',
  },
  {
    id: '3',
    tag: 'YOUR TERMS',
    title: 'Fuel Up &\nDrive Free.',
    subtitle: 'Transparent pricing, daily km limits and zero hidden charges. Always.',
    image: 'https://sslphotos.jato.com/PHOTO400/SSCIND/TOYOTA/GLANZA/2023/5HA.JPG',
    accentClass: 'bg-[#E8500A]',
    accentText: 'text-[#E8500A]',
    btnClass: 'bg-[#E8500A]',
  },
]

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const flatListRef = useRef<FlatList>(null)

  return (
    <SafeAreaView className='flex-1'> 

    </SafeAreaView>
  )
}

export default Onboarding

const styles = StyleSheet.create({})