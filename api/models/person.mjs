import 'mongoose-type-email'

import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import mongooseTypePhone from 'mongoose-type-phone'

mongoose.SchemaTypes.Email.defaults.message = 'A valid email address is required.'

const PersonSchema = mongoose.Schema({
  name: {
    type: String,
    required: 'Type your full name!',
    index: true,
    trim: true
  },
  emailAddress: {
    type: mongoose.SchemaTypes.Email,
    allowBlank: false,
    required: 'An email address is required.',
    index: true,
    unique: true,
    lowercase: false,
    trim: true
  },
  emailConfirmed: {
    type: Boolean,
    default: false
  },
  mobilePhone: {
    type: mongoose.SchemaTypes.Phone,
    required: false,
    index: true,
    trim: true,
    allowedNumberTypes: [mongooseTypePhone.PhoneNumberType.MOBILE],
    phoneNumberFormat: mongooseTypePhone.PhoneNumberFormat.INTERNATIONAL,
    defaultRegion: 'NO',
    parseOnGet: true
  },
  roles: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Role'
  }]
}, {
  timestamps: true
})

// Please note this must not be async due to variable scope for 'this'.
PersonSchema.pre('save', function (next) {
  // Only run this is password is changed. Otherwise, it will be
  // hashed multiple times nestedly.
  if (!this.isModified('password')) return next()

  // Convert password to password hash.
  if (this.password) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) return next(err)
      bcrypt.hash(this.password, salt, null, function (err, hash) {
        if (err) return next(err)
        this.password = hash
        next(err)
      })
    })
  }
})

export default mongoose.model('Person', PersonSchema, 'persons')
