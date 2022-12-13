import { FC } from 'react'
import withLayout, { IDashboardProps } from './DashboardLayout'

const Dashboard: FC<IDashboardProps> = ({ connectedUser }) => (
  <div className="dashboard">
    <h1>Welcome, {connectedUser.username}!</h1>
    <ul>
      <li>
        <a href="/logout">Logout</a>
      </li>
    </ul>
  </div>
)

export default withLayout(Dashboard)
