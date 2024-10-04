const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGOOB_URI);
        if (conn.connection.readyState === 1) {
            console.log('DB connect successfully');
        } else {
            console.log('DB connect failed')
        }
    }
    catch (error) {
        console.log("DB connect failed");
        throw new Error(error)
    }
}

module.exports = dbConnect;