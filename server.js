const express =  require('express');
const dotenv = require('dotenv');
dotenv.config({path:'./config/config.env'});
const colors = require('colors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const connectDb = require('./config/db');
const showrooms = require('./routes/showrooms');
const bikes = require('./routes/bikes');
const users = require('./routes/users');
const auth = require('./routes/auth');
connectDb();
const app = express();



app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use('/api/showrooms',showrooms);
app.use('/api/bikes',bikes);
app.use('/api/users',users);
app.use('/api/auth',auth);
const PORT = 5000 || process.env.PORT;
app.listen(5000,() => console.log(`Server connected at PORT ${PORT} in ${process.env.NODE_ENV}`.yellow));






