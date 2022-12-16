# GraphQL

### Query user

```graphql
query { 
  getUsers {
    id
    username
    email
    privilege
  } 
}
```

### Mutation user

```graphql
    mutation { 
      createUser(
        input: {
          username: "admin",
          email: "admin@js.education", 
          password: "123456", 
          privilege: "god",
          active: true
        } 
      )
      {
        id
        username
        email
        password
        privilege
      } 
    }
```

### Login

```graphql
mutation { 
    login(
    input: {
      email: "fake@email.com", 
      password: "123456"
    } 
  ){
    token
  } 
}
```