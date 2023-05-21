import { ImageBackground } from 'react-native'
import { styled } from 'nativewind'
import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import {
  useFonts,
  Roboto_400Regular as roboto400Regular,
  Roboto_700Bold as roboto700Bold,
} from '@expo-google-fonts/roboto'
import { BaiJamjuree_700Bold as baiJamjuree700Bold } from '@expo-google-fonts/bai-jamjuree'
import * as SecureStore from 'expo-secure-store'

import blurBgImage from '../assets/blur.png'
import Stripes from '../assets/stripes.svg'

const StyledStripes = styled(Stripes)

export default function Layout() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<
    null | boolean
  >(null)

  const [hasLoadedFonts] = useFonts({
    roboto400Regular,
    roboto700Bold,
    baiJamjuree700Bold,
  })

  useEffect(() => {
    SecureStore.getItemAsync('jwt').then((jwt) => {
      setIsUserAuthenticated(!!jwt)
    })
  }, [])

  // Font Guard
  if (!hasLoadedFonts) return <SplashScreen />

  return (
    <ImageBackground
      source={blurBgImage}
      className="relative flex-1 bg-gray-900"
      imageStyle={{ position: 'absolute', left: '-100%' }}
    >
      <StyledStripes className="absolute left-2" />
      <StatusBar style="light" translucent />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
          animation: 'fade',
        }}
      >
        <Stack.Screen name="index" redirect={isUserAuthenticated} />
        <Stack.Screen name="memories" />
        <Stack.Screen name="newMemory" />
      </Stack>
    </ImageBackground>
  )
}
