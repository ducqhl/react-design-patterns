// Dependencies
import { FC, createContext, ReactElement, useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { getGraphQlError, redirectTo, getDebug } from '@contentpi/lib'
import { useQuery, useMutation } from '@apollo/client'

// Mutations
import LOGIN_MUTATION from '../graphql/user/login.mutation'

// Queries
import GET_USER_DATA_QUERY from '../graphql/user/getUserData.query'
import IUser from '../types/types'

// Interfaces
interface IUserContext {
  login(input: any): any
  connectedUser?: IUser
}

interface IProps {
  page?: string
  children: ReactElement
}

// Context
export const UserContext = createContext<IUserContext>({
  login: () => null
})

// Provider
const UserProvider: FC<IProps> = ({ page = '', children }): ReactElement => {
  const [cookies, setCookies] = useCookies()
  const [connectedUser, setConnectedUser] = useState()

  // Mutations
  const [loginMutation] = useMutation(LOGIN_MUTATION)

  // Queries
  const { data: dataUser } = useQuery(GET_USER_DATA_QUERY, {
    variables: {
      at: cookies.at || ''
    }
  })

  // Effects
  useEffect(() => {
    if (!dataUser) return

    if (!dataUser.getUserData.id && page !== 'login') {
      // If the user session is invalid and is on a different page than login we redirect them to login
      redirectTo('/login?redirectTo=/dashboard', false)
    } else {
      // If we have the user data available we save it in our connectedUser state
      setConnectedUser(dataUser.getUserData)
    }
  }, [dataUser, page])

  const login = async (input: {
    email: string
    password: string
  }): Promise<any> => {
    try {
      // Executing our loginMutation passing the email and password
      const { data: dataLogin } = await loginMutation({
        variables: {
          email: input.email,
          password: input.password
        }
      })

      if (dataLogin) {
        // If the login was success, we save the token in our "at" cookie
        setCookies('at', dataLogin.login.token, { path: '/' })

        return dataLogin.login.token
      }
    } catch (err) {
      // If there is an error we return it
      return getGraphQlError(err)
    }
  }

  const context = {
    login,
    connectedUser
  }

  return <UserContext.Provider value={context}>{children}</UserContext.Provider>
}

export default UserProvider
