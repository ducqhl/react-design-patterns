// Dependencies
import { redirectTo } from '@contentpi/lib'
import { ComponentType, FC, ReactElement, useContext, useEffect } from 'react'

// Contexts
import { UserContext } from '../../contexts/user'

// Components
import LoginProps from './Login'

// Interfaces
interface IProps {
  currentUrl: string
}

export interface ILoginProps {
  login(input: any): any
  currentUrl: string
}

const withLayout =
  (Login: ComponentType<ILoginProps>) =>
  ({ currentUrl }): ReactElement => {
    const { login } = useContext(UserContext)

    return <Login login={login} currentUrl={currentUrl} />
  }

export default withLayout
