const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
       
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
       
    },
    numberViews:{
        type:Number,
        default:0
    },
    // isLiked: {
    //     type:Boolean,
    //     default:false
    // },
    // isDisliked : {
    //     type:Boolean,
    //     dafault: false
    // },
    likes: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    disLikes: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
    ],
    image: {
        type: String,
        default: 'https://c0.wallpaperflare.com/preview/639/306/330/aerial-background-blog-cafe-thumbnail.jpg'
    },
    author: {
        type: String,
        default: 'Admin'
    }
},{
    timestamps: true,
    toJSON: {virtuals: true}, // khi dùng json hàm .json
    toObject: {virtuals: true}
});

//Export the model
module.exports = mongoose.model('Blog', blogSchema);