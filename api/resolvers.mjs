import { Bed, Person, Room } from './models/index.mjs'
import mongoose from 'mongoose'
const { UserInputError } = mongoose

const bedResolvers = {
  Query: {
    bed: (root, { id }, ctx, info) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw UserInputError('Not a valid ObjectID')
      }
      return Bed.findByid(id)
    },
    beds: (root, args, ctx, info) => Bed.find()
  },

  Mutation: {
    bedCreate: (root, args, ctx, info) => {
      Bed.create(args)
      Room.findOneAndUpdate(
        { id: args.room },
        { $push: { beds: args.id } }
      ).execPopulate()
    },
    bedDelete: (root, { id }, ctx, info) => Bed.findByIdAndDelete(id)
  }
}

const personResolvers = {
  Query: {
    // auth, projection, pagination
    person: (root, { id }, ctx, info) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw UserInputError('Not a valid personID')
      }
      return Person.findByid(id)
    },
    persons: (root, args, ctx, info) => Person.find({})
  },

  Mutation: {
    personCreate: (root, args, ctx, info) => Person.create(args),
    personDelete: (root, args, ctx, info) => {

    },
    personGetPrice: (root, args, ctx, info) => {

    },
    personIsHost: (root, args, ctx, info) => {

    },
    personSetAnonymous: (root, args, ctx, info) => {

    },
    personSetHost: (root, args, ctx, info) => {

    },
    personSetEmailConfirmed: (root, args, ctx, info) => {

    },
    personSetMobilePhone: (root, args, ctx, info) => {

    }
  }
}

const roleResolvers = {
  Query: {
    role: (root, arg, ctx, info) => {

    },
    roles: (root, arg, ctx, info) => {

    }
  },

  Mutation: {
    roleCreate: (root, arg, ctx, info) => {

    },
    roleDelete: (root, arg, ctx, info) => {

    }
  }
}

const roomResolvers = {
  Query: {
    room: (root, { id }, ctx, info) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw UserInputError('Not a valid ObjectID')
      }
      return Room.findByid(id)
    },
    rooms: async (root, args, ctx, info) => {
      const results = await Room.find().populate('beds').exec()
      console.log(results)
      return results
    }
  },

  Mutation: {
    roomCreate: (root, args, ctx, info) => Room.create(args),
    roomDelete: (root, { id }, ctx, info) => Room.findByIdAndDelete(id)
  },

  Room: {
    beds: async (room, args, ctx, info) => {
      await room.populate('beds').execPopulate()
      console.log(`Updated room with ${JSON.stringify(room)}`)
      return room.beds
    }
  }
}

/* eslint import/no-anonymous-default-export: [2, {"allowArray": true}] */
export default [
  bedResolvers,
  personResolvers,
  roleResolvers,
  roomResolvers
]
