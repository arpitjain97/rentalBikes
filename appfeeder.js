const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const Showroom = require('./models/Showroom');
const Bike = require('./models/Bike');
const User = require('./models/User');

const dotenv = require('dotenv');
dotenv.config({path:'./config/config.env'});
mongoose.connect(process.env.MONGO_URI,{
    useNewURLParser:true,
    useUnifiedtopology:true
});
const showrooms = JSON.parse(fs.readFileSync(`${__dirname}/data/showrooms.json`,'utf-8'));
const bikes = JSON.parse(fs.readFileSync(`${__dirname}/data/bikes.json`,'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/data/users.json`,'utf-8'));
const importData = async () =>{
    try {
        await Showroom.create(showrooms);
        await Bike.create(bikes);
        await User.create(users);
        console.log('Data Inserted'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(error)
    }
    
}

const deleteData = async () =>{
    try {
        await Showroom.deleteMany();
        await Bike.deleteMany();
        await User.deleteMany();
        console.log('Data Deleted'.red.inverse);
        
        process.exit();
    } catch (error) {
        console.error(error)
    }
    
}

if(process.argv[2]==='-i'){
    importData();
}
else if(process.argv[2]==='-d'){
    deleteData();
}