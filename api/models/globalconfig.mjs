import mongoose from 'mongoose'

const globalConfigSchema = mongoose.Schema({
  hosts: [String],
  prices: {
    type: Map,
    of: Number
  }
})

export default mongoose.model('GlobalConfig', globalConfigSchema, 'globalconfig')
