import mongoose from 'mongoose'

const { ObjectId } = mongoose.SchemaTypes

const RoomSchema = mongoose.Schema({
  desc: String,
  noBedsToCreate: Number,
  beds: [{
    type: ObjectId,
    ref: 'Bed'
  }]
})

export default mongoose.model('Room', RoomSchema, 'rooms')
