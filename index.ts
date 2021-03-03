import Server from './classes/server';
import userRoutes from './routes/user';
import mongoose from 'mongoose';

const server = new Server();

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