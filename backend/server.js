

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const App = require('./src/app');

const server = express();

const PORT = process.env.PORT || 5000;

const app = new App(server);

app.initializeMiddleware();
app.initializeRoutes();
app.initializeErrorHandling();

server.listen(PORT, () => {
    console.log(` port is runnin at ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);

});

process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: Shutting down gracefully');
    server.close(() => {
        console.log('Server closed successfully ✅');
        process.exit(0);
    });
});

