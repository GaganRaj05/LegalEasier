require('dotenv').config();
const express = require('express')
const helmet = require('helmet');
const morgan = require('morgan');
const connectToDb = require('./config/db');
const authRouter = require('./routes/auth');
const contactRoutes = require('./routes/contact');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const app = express()
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())
app.use(helmet());
app.use(morgan('dev'));

app.use('/app/contact',contactRoutes);
app.use("/app/auth",authRouter);



connectToDb(process.env.MONGODB_URL);
app.listen(process.env.PORT, ()=>console.log("Server started at PORT:",process.env.PORT))