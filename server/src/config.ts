import { exit } from 'process'

interface Config {
  DATABASE_URL: string
  GITHUB_CLIENT_ID: string
  GITHUB_CLIENT_SECRET: string
  JWT_SECRET: string
}

const keyTypes = [
  'DATABASE_URL',
  'GITHUB_CLIENT_ID',
  'GITHUB_CLIENT_SECRET',
  'JWT_SECRET',
] as const

const config: Config = {
  DATABASE_URL: '',
  GITHUB_CLIENT_ID: '',
  GITHUB_CLIENT_SECRET: '',
  JWT_SECRET: '',
}

keyTypes.forEach((key) => {
  if (!process.env[key]) {
    console.error(`Environment variables missing '${key}' value.`)
    exit(1)
  }

  config[key] = process.env[key]!
})

export default config
