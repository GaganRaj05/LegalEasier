require('dotenv').config();
const express = require('express')
const helmet = require('helmet');
const morgan = require('morgan');
const connectToDb = require('./config/db');
const authRouter = require('./routes/auth');
const contactRoutes = require('./routes/contact');
const cookieParser = require('cookie-parser');
const notaryRoutes = require('./routes/notary');
const leadsRoutes = require('./routes/leads');
const meetingRoutes = require('./routes/meetings')
const adminRoutes = require('./routes/admin');

const cors = require('cors')
const app = express()
app.set('trust proxy', 1); 
app.use(cookieParser());
app.use(cors({
    origin:[process.env.FRONTEND_URL,'http://localhost:5173'],
    credentials:true
}))
app.use(express.json())
app.use(helmet());
app.use(morgan('dev'));

app.use('/app/notary', notaryRoutes);
app.use('/app/contact',contactRoutes);
app.use("/app/auth",authRouter);
app.use('/app/leads',leadsRoutes);
app.use('/app/meetings',meetingRoutes);
app.use('/app/admin',adminRoutes);

require('./utils/inactivityChecker')
connectToDb(process.env.MONGODB_URL);
app.listen(process.env.PORT, ()=>console.log("Server started at PORT:",process.env.PORT))