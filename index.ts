import Server from './classes/server';
import userRoutes from './routes/user';

const server = new Server();

// Routes
server.app.use('/user', userRoutes);



// Raise server
server.start(() => {
    console.log(`Server listening in port: ${server.port}`);
});