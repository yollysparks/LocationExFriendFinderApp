import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphQL"
}); 
const Users = () => (
  <Query
    query={gql`
      {
         getAllUsers{
          firstName
          lastName
          userName
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.getAllUsers.map(({ firstName,lastName, userName }) => (
        <p>{`${firstName} ${lastName} ${userName}`}</p>
      ));
    }}
  </Query>
);

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
      <div>
        <Users/>
      </div>
    </ApolloProvider>
    );
  }
}

export default App;