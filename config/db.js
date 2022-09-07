const mongoose = require('mongoose');
const connectDb = async () =>{
    const connect = await mongoose.connect(process.env.MONGO_URI,{useNewURLParser:true,
        useUnifiedtopology:true})
        console.log(`MongoDb connected ${connect.connection.host}`.cyan.underline.bold);
}

module.exports = connectDb;