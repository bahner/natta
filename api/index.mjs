import { ApolloServer } from 'apollo-server-express'
import config from './config.mjs'
import express from 'express'
import { getOrSetGlobalConfig } from './utils.mjs'
import { initRikssenter } from './data/rikssenter.mjs'
import mongoose from 'mongoose'
import pRetry from 'p-retry'
import resolvers from './resolvers.mjs'
import typeDefs from './typeDefs.mjs'

const mongoConnect = async () => {
  await mongoose.connect(config.mongo.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  return 'Successfully connected to mongo.'
}

const server = new ApolloServer({
  introspection: config.introspection,
  playground: config.playground,
  typeDefs,
  resolvers
})

const app = express()

app.get('/', function (req, res) {
  res.send('Hello, world!')
})

const startServer = async () => {
  console.log(await pRetry(mongoConnect, { retries: 3 })
    .catch(err => console.error(err.message))
  )

  console.log(`Getting or setting globalConfig ${await getOrSetGlobalConfig(config.globalConfig)}`)

  try {
    await initRikssenter()
  } catch (err) {
    console.log(err)
  }

  server.applyMiddleware({ app })

  app.listen(config.port, () =>
    console.log(`Graphql server running at http://0.0.0.0:${config.port}${server.graphqlPath}`)
  )
}

startServer()
