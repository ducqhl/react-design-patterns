// Components
import Dashboard from '../components/dashboard/Dashboard'

// Contexts
import UserProvider from '../contexts/user'

const DashboardPage = () => (
  <UserProvider>
    <Dashboard />
  </UserProvider>
)

export default DashboardPage
