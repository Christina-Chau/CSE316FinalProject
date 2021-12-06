const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Top5ListSchema = new Schema(
    {
        userName: { type: String, required: true },
        name: {type: String, required: true},
        items: { type: [String], required: true },
        ownerEmail: { type: String },
        published: { type: Boolean, required: true },
        publishedDate: { type: String, required: true },
        comments: { type: Map, of: String, required: true },
        likes: { type: [String], required: true },
        dislikes: { type: [String], required: true },
        views: { type: Number, required: true}
    },
    { timestamps: true },
)

module.exports = mongoose.model('Top5List', Top5ListSchema)
