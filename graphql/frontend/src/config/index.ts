// Configuration
import common from './common.json'
import development from './development.json'
import production from './production.json'

interface IConfig {
  baseUrl: string
  apiUrl: string
  server: {
    port: number
  }
  security: {
    secretKey: string
    expiresIn: string
  }
}

const { NODE_ENV = 'development' } = process.env

// Environments validations
export const isDevelopment = () => NODE_ENV === 'development'
export const isProduction = () => NODE_ENV === 'production'

if (!isDevelopment() && !isProduction()) {
  throw new Error('Environment was not valid')
}
const config: IConfig = {
  ...common,
  ...(isDevelopment() ? development : production)
}

export default config
