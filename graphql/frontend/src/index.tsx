import ReactDOM from 'react-dom'

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import config from './config'
import AppRoutes from './AppRoutes'

// Apollo Client configuration
const client = new ApolloClient({
  uri: config.apiUrl,
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <AppRoutes />
  </ApolloProvider>,
  document.querySelector('#root')
)
