const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim: true
    },
   
    slug:{
        type:String,
        required:true,
        unique:true,
        // viết thường
        lowercase:true
    },
    description:{
        type:String,
        required:true,
    },
    // nhãn hiệu nhà sản xuất
    brand:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    // hạng mục
    category:{
        type:mongoose.Types.ObjectId,
        ref: 'Category'
    },
    // số lượng sản phẩm
    quantity:{
        type:Number,
        default:0
    },
    // Số lượng đã bán
    sold:{
        type: Number,
        default: 0
    },
    // ảnh
    images: {
        type: Array,
 
    },
    color: {
        type: String,
        enum: ['Black', 'Grown', 'Green']
    },
    ratings: [
        {
            star: {type: Number},
            postedBy: {type:mongoose.Types.ObjectId,ref: 'User'}, //Nguời vote
            comment: {type: String}
        }
    ],
    totalRatings:{
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

//Export the model
module.exports = mongoose.model('Product', userSchema);