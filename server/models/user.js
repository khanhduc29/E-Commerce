//  gõ !mdbg táp

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');




const userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        avatar: {
            type: String
        },
        mobile: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: 'user',
        },
        cart: [
            {
                product: {
                    type: mongoose.Types.ObjectId,
                    ref: 'Product',
                },
                quantity: Number,
                color: String,
            },
        ],
        address: {
            type: Array,
            default: []
        },
        wishlist: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Product',
            },
        ],
        isBlocked: {
            type: Boolean,
            default: false,
        },
        refreshToken: {
            type: String,
        },
        passwordChangedAt: {
            type: String,
        },
        passwordResetToken: {
            type: String,
        },
        passwordResetExpires: {
            type: String,
        },
       
    },
    { timestamps: true },
);

// middleware mã hóa mật khẩu trước khi lưu
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Phương thức của userSchema
userSchema.methods = {
    // Kiểm tra mật khẩu
    isCorrectPassword: async function (password) {

        return await bcrypt.compare(password, this.password);
    },
    // Tạo token thay đổi mật khẩu
    createPasswordChangedToken: function () {
        const resetToken = crypto.randomBytes(32).toString('hex');
        this.passwordResetToken = crypto
            .createHash('SHA256')
            .update(resetToken)
            .digest('hex');
        this.passwordResetExpires = Date.now() + 15 * 60 * 1000;
        return resetToken;
    },
   
};

module.exports = mongoose.model('User', userSchema);