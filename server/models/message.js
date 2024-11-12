const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var messageSchema = new mongoose.Schema({
    chatId:{
        type:String,
        // required:true,
        // unique:true,
        index:true,
    },
    senderId:{
        type:String,
        // required:true,
        // unique:true,
    },
    text:{
        type:String,
        // required:true,
        // unique:true,
    },
   
},{
    timestamps: true
});

//Export the model
module.exports = mongoose.model('chat', messageSchema);