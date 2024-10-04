const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var couponSchema = new mongoose.Schema({
    name:{
        uppercase: true,
        type:String,
        required:true,
        unique:true,
    
    },
    discount:{
        type:Number,
        required:true,
       
    },
    // hạn sử dụng của coupon
    expiry:{
        type:Date,
        required:true,
        
    }
  
},{
    timestamps:true,
});

//Export the model
module.exports = mongoose.model('Coupon', couponSchema);