//  gõ !mdbg táp

const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt'); // Erase if already required
const crypto = require('crypto'); // Erase if already required
// Chuỗi băm mật khẩu tăng tính bảo mật
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

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        next()
    }
        
    const salt = bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
    
})

userSchema.methods = {
    isCrorrectPassword: async function(pass){
        return  await bcrypt.compare(pass, this.password);
    },
    createPasswordChangeToken: function(){
        const resetToken = crypto.randomBytes(32).toString('hex')
        this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
        this.passwordResetExpires = Date.now() + 15 * 60 * 1000
        return resetToken
    }
}


//Export the model
module.exports = mongoose.model('User', userSchema);