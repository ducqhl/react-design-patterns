import { BrowserRouter, Switch, Route } from 'react-router-dom'
import HomePage from './pages/home'
import DashboardPage from './pages/dashboard'
import LoginPage from './pages/login'
import Error404Page from './pages/error404'

const AppRoutes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={HomePage} exact />
      <Route path="/dashboard" component={DashboardPage} exact />
      <Route path="/login" component={LoginPage} exact />
      <Route component={Error404Page} />
    </Switch>
  </BrowserRouter>
)

export default AppRoutes
