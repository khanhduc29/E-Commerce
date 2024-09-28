//  gõ !mdbg táp

const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
        // unique:true,
        // index:true,
    },
    lastname:{
        type:String,
        required:true
        // unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
        // unique là không được trùng
    },
    mobile:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'user'
    },
    // role phân quyền
    cart:{
        type:Array,
        default: []
    },
    address:[
        {type: mongoose.Types.ObjectId, ref: 'Address'},
    ],
    wishlist:[
        {type: mongoose.Types.ObjectId, ref: 'Product'},
    ],
    // chức năng khóa tài khoản
    isBolocked: {
        type:Boolean,
        default: false
    },
    refreshToken:{
        type:String
    },
    passwordChangeAt: {
        type:String
    },
    passwordResetToken: {
        type:String
    },
    passwordResetExpires: {
        type:String
    }

}, {
    timestamps: true
});

//Export the model
module.exports = mongoose.model('User', userSchema);