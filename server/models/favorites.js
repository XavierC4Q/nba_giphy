import mongoose from 'mongoose'

const schema = mongoose.Schema

const FavoritesSchema = new schema({
    username: {
        required: true,
        type: String
    },
    title: {
        required: true,
        type: String
    },
    path: {
        required: true,
        type: String
    },
    posted: {
        type: Date
    }
})

export const Favorites = mongoose.model('Favorites', FavoritesSchema)