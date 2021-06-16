import { gql } from 'apollo-server-express'

const bedDef = gql`

  extend type Query {
    bed(id: ID!): Bed
    beds: [Bed!]!
  }

  extend type Mutation {
    bedCreate(desc: String, room: ID!): Bed!
    bedDelete(id: ID!): Boolean
  }

  type Bed {
      id: ID!
      desc: String!
      room: ID
  }
`
const personDef = gql`

  extend type Query {
      person(id: ID!): Person
      persons: [Person!]!
  }

  extend type Mutation {
    personCreate(
      name: String!,
      anonymous: Boolean,
      emailAddress: String!,
      emailConfirmed: Boolean,
      mobilePhone: String,
      password: String!): Person
    personDelete(id: ID!): Boolean
    personGetPrice(id: ID!, resource: String!): Int
    personIsHost(id: ID!): Boolean!
    personSetAnonymous(id: ID!, anonymous: Boolean!): Boolean
    personSetHost(id: ID!, Host: Boolean!): Boolean
    personSetEmailConfirmed(id: ID!, emailConfirmed: Boolean!): Boolean
    personSetMobilePhone(id: ID!, mobilePhone: String!): String
    personSetPassword(id: ID!, password: String!): Boolean
  }
  
  type Person {
    id: ID!
    name: String!
    anonymous: Boolean!
    createdAt: String!
    updatedAt: String!
    emailAddress: String!
    emailConfirmed: Boolean!
    mobilePhone: String
    password: String!
    roles: [Role!]!
  }
`
const roleDef = gql`

  extend type Query {
    role(id: ID!): Role
    roles: [Role!]!
  }

  extend type Mutation {
    roleCreate(name: String!, desc: String): Role!
    roleDelete(id: ID!): Boolean!
  }

  type Role {
      id: ID!
      name: String!
      desc: String!
  }

`

const roomDef = gql`

  extend type Query {
    room(id: ID!): Room
    rooms: [Room!]!
  }

  extend type Mutation {
    roomCreate(name: String!, desc: String): Room!
    roomDelete(id: ID!): Boolean!
  }

  type Room {
      id: ID!
      name: String!
      desc: String
      beds: [Bed]
  }

`
const rootDef = gql`

  type Query {
      _: String
  }
  
  type Mutation {
      _: String
  }

`

export default [
  bedDef,
  personDef,
  roleDef,
  roomDef,
  rootDef
]
