const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();

        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            search: '/api/search',
            uploads: '/api/uploads',
            users: '/api/users'
        }

        // Database connection
        this.conecctDB();

        // Middlewares
        this.middlewares();

        // Aplication routes
        this.routes();
    }

    async conecctDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Body lecture and parser
        this.app.use(express.json());

        // Public directory
        this.app.use(express.static('public'));

        // Fileupload
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth.routes'));
        this.app.use(this.paths.uploads, require('../routes/uploads.routes'));
        this.app.use(this.paths.users, require('../routes/user.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running in port', process.env.PORT);
        })
    }
}

module.exports = Server;