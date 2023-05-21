import { StatusBar } from 'expo-status-bar'
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import { styled } from 'nativewind'
import * as SecureStore from 'expo-secure-store'
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import { useEffect } from 'react'
import { useRouter } from 'expo-router'
import {
  useFonts,
  Roboto_400Regular as roboto400Regular,
  Roboto_700Bold as roboto700Bold,
} from '@expo-google-fonts/roboto'
import { BaiJamjuree_700Bold as baiJamjuree700Bold } from '@expo-google-fonts/bai-jamjuree'

import blurBgImage from '../assets/blur.png'
import Stripes from '../assets/stripes.svg'
import Logo from '../assets/logo.svg'
import { api } from '../src/services/api.service'

const StyledStripes = styled(Stripes)

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint:
    'https://github.com/settings/connections/applications/8d5f0e76f411ee30c511',
}

export default function App() {
  const router = useRouter()

  const [hasLoadedFonts] = useFonts({
    roboto400Regular,
    roboto700Bold,
    baiJamjuree700Bold,
  })

  const [, response, signInWithGithub] = useAuthRequest(
    {
      clientId: '8d5f0e76f411ee30c511',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'nlwspacetime',
      }),
    },
    discovery,
  )

  async function handleGithubOAuthCode(code: string) {
    const res = await api.post('/register', { code })

    const { jwt } = res.data

    await SecureStore.setItemAsync('jwt', jwt)

    router.push('/memories')
  }

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params

      handleGithubOAuthCode(code)
    }
  }, [response])

  // Guard
  if (!hasLoadedFonts) return null

  return (
    <ImageBackground
      source={blurBgImage}
      className="relative flex-1 items-center bg-gray-900 px-8 py-10"
      imageStyle={{ position: 'absolute', left: '-100%' }}
    >
      <StyledStripes className="absolute left-2" />

      <View className="flex-1 items-center justify-center gap-6">
        <Logo />

        <View className="space-y-2">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">
            Sua cápsula do tempo
          </Text>
          <Text className="text-center font-body text-base leading-relaxed text-gray-100">
            Colecione momentos marcantes da sua jornada e compartilhe (se
            quiser) com o mundo!
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          className="rounded-full bg-green-500 px-5 py-3"
          onPress={() => signInWithGithub()}
        >
          <Text className="font-alt text-sm uppercase text-black">
            Cadastrar lembrança
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
        Feito com 💜 no NLW Spacetime da Rocketseat
      </Text>

      <StatusBar style="light" translucent />
    </ImageBackground>
  )
}
