import Server from './classes/server';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import userRoutes from './routes/user';
import postRoutes from './routes/post';
import cors from 'cors';

const server = new Server();

// Body parser
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

// FileUpload
server.app.use(fileUpload());

// Config CORS
server.app.use(cors({origin: true, credentials: true}));

// Routes
server.app.use('/user', userRoutes);
server.app.use('/posts', postRoutes);

// Connect DB
mongoose.connect('mongodb://localhost:27017/fotostagram', 
                {useNewUrlParser: true, useCreateIndex: true}, (err) => {
                    if (err) throw err;
                    console.log('DB online!');
                });

// Raise server
server.start(() => {
    console.log(`Server listening in port: ${server.port}`);
});