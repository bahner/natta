import mongoose from 'mongoose'

const BedSchema = mongoose.Schema({
  desc: String,
  room: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Room'
  }
})

export default mongoose.model('Bed', BedSchema, 'beds')
