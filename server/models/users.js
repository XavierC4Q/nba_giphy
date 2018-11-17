import mongoose from 'mongoose'
import { default as passportLocalMongoose } from 'passport-local-mongoose'

const schema = mongoose.Schema

const UserSchema = new schema({
    username: {
        unique: true,
        required: true,
        type: String
    },
    email: {
        unique: true,
        required: true,
        type: String
    }
})

UserSchema.plugin(passportLocalMongoose)

export const Users = mongoose.model('Users', UserSchema)