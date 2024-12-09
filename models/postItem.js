// models/postItem.js
import mongoose from 'mongoose';

const postItemSchema = new mongoose.Schema({
    img: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    imageType: {
        type: String,
        default: 'cover'
    }
}, { timestamps: true });

const PostItem = mongoose.model('PostItem', postItemSchema);

export default PostItem;
