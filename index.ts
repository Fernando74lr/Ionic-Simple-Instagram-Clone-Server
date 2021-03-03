import Server from './classes/server';
import userRoutes from './routes/user';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const server = new Server();

// Body parser
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

// Routes
server.app.use('/user', userRoutes);

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