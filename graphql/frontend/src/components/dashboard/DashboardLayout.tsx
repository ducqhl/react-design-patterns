// Dependencies
import { ComponentType, ReactElement, useContext } from 'react'

// Contexts
import { UserContext } from '../../contexts/user'
import { IUserLogin } from '../../types'

export interface IDashboardProps {
  connectedUser: IUserLogin
}

const withLayout =
  (Dashboard: ComponentType<IDashboardProps>) => (): ReactElement => {
    const { connectedUser } = useContext(UserContext)

    if (connectedUser) {
      return <Dashboard connectedUser={connectedUser} />
    }

    return <></>
  }

export default withLayout
