import mongoose from 'mongoose'

export const RoleSchema = mongoose.Schema({
  name: String,
  desc: String
})

export default mongoose.model('Role', RoleSchema, 'roles')
