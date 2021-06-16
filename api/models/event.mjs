import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema

const EventScehma = mongoose.Schema({
  desc: String,
  bed: {
    type: ObjectId,
    ref: 'Bed'
  },
  host: {
    type: ObjectId,
    ref: 'Person'
  },
  guest: {
    type: ObjectId,
    ref: 'Person'
  },
  price: Number,
  startDate: Date,
  endDate: Date
}, {
  timestamps: true
})

export default mongoose.model('Event', EventScehma, 'events')
