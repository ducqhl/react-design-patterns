import { isBrowser } from '@contentpi/lib'
import { FC } from 'react'
import Login from '../components/user/Login'
import UserProvider from '../contexts/user'

interface LoginPageProps {
  currentUrl: string
}

const LoginPage: FC<LoginPageProps> = ({
  currentUrl = isBrowser()
    ? window.location.search.replace('?redirectTo=', '')
    : ''
}) => (
  <UserProvider page="login">
    <Login currentUrl={currentUrl} />
  </UserProvider>
)

export default LoginPage
