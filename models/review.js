const { string } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema; //shortcut 
mongoose.set('strictQuery', true);


const ReviewSchema = new Schema({
    body: String,
    rating: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Review', ReviewSchema);