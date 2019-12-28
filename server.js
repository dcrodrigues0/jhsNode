const restify = require('restify');
//ROUTES
const UserController = require('./controller/UserController');

class Server {

    initializateServer(){
        var server = restify.createServer();   
        let user = new UserController(server);

        user.loadRoutes(restify);

        server.listen(8080, function() {
            console.log('%s listening at %s', server.name, server.url);
        });
    }
}

//calling initialize
let server = new Server();
server.initializateServer();