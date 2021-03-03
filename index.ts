import Server from './classes/server';

const server = new Server();

// Raise server
server.start(() => {
    console.log(`Server listening in port: ${server.port}`);
});