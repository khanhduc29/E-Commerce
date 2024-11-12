const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var chatSchema = new mongoose.Schema({
    members:{
        type:Array,
        // required:true,
        // unique:true,
        // index:true,
    }
 
 
},{
    timestamps: true,
});

//Export the model
module.exports = mongoose.model('Chat', chatSchema);