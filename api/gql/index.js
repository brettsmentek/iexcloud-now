const { ApolloServer, gql } = require('apollo-server-micro')
const RestApi = require('./restApi')

// The GraphQL schema
const typeDefs = gql`
  type Top {
    lastSalePrice: Float!
    volume: Int!
    sector: String!
    symbol: String!
  }

  type Symbol {
    symbol: String!
    exchange: String!
    name: String!
  }

  type Query {
    tops(ticker: String!): Top
    symbols: [Symbol!]!
  }
`

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    tops: async (_source, { ticker }, { dataSources }) => {
      return (await dataSources.restApi.getTops(ticker))[0]
    },
    symbols: async (_source, {}, { dataSources }) => {
      return dataSources.restApi.getSymbols()
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      restApi: new RestApi(),
    };
  },
  introspection: true,
  playground: true,
})

module.exports = server.createHandler({ path: '/api/gql' })