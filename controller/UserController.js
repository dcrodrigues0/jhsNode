const User = require('../model/User');

module.exports = class UserController {

    constructor(server){
        this.server = server;
    }

    getListAllUsers(){
        function respond(req, res, next) {
            const user = new User();
            user.listAllUsers((users)=>{
                res.send(users);
                next();
            });
        }
        this.server.get('/getusers', respond);
    }

    getListUserByID(){
        function respond(req, res, next) {
            const user = new User();
            user.listUserByID(1,req.params.id,(user)=>{
                res.send(user);
                next();
            });
        }
        this.server.get('/getuser/:id', respond);
    }

    getListUserAndScheduleByID(){
        function respond(req, res, next) {
            const user = new User();
            user.listUserAndScheduleByID(req.params.id,(user)=>{
                res.send(user);
                next();
            });
        }
        this.server.get('/getuserschedule/:id', respond);
    }

    insertUser(restify){
        function respond(req, res, next) {
            const user = new User();
            var userData = req.body;
            if (!req.is('application/json')) {
                return next(
                    new errors.InvalidContentError("Expects 'application/json'"),
                );
            }
            user.insertUser(userData,(status)=>{
                res.send(status);
                next();
            });
        }
        this.server.use(restify.plugins.bodyParser());
        this.server.post('/insertuser',respond);
    }

    deleteUser(){
        function respond(req, res, next) {
            const user = new User();
            user.deleteUser(req.params.id,(status)=>{
                res.send(status);
                next();
            });
        }
        this.server.del('/deleteuser/:id',respond);
    }

    updateUser(restify){
        function respond(req, res, next) {
            const user = new User();
            var userData = req.body;
            if (!req.is('application/json')) {
                return next(
                    new errors.InvalidContentError("Expects 'application/json'"),
                );
            }
            user.updateUser(req.params.id,userData,(status)=>{
                res.send(status);
                next();
            });
        }
        this.server.use(restify.plugins.bodyParser());
        this.server.put('/updateuser/:id',respond);
    }

    

    loadRoutes(restify){
        this.getListAllUsers();
        this.getListUserByID();
        this.getListUserAndScheduleByID();
        this.insertUser(restify);
        this.deleteUser();
        this.updateUser(restify);
    }

}