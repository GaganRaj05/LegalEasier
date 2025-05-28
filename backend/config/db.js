const mongoose = require('mongoose');

const connectToDb = async (url) => {
    try {
        await mongoose.connect(url)
        console.log("Mongodb connected successfully")
    }
    catch(err){
        console.log("Error occured while connecting to DB",err.message);
        
    }
}
module.exports = connectToDb;