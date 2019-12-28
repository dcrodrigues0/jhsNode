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
            user.listUserByID(req.params.id,(user)=>{
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

    insertUser(){
        function respond(req, res, next) {
            const user = new User();
            var userData = req.body;
            console.log(req)
            /*user.insertUser(userData,(user)=>{
                res.send(user);
                next();
            });*/
        }
        this.server.post('/insertuser',respond);
    }

    loadRoutes(){
        this.getListAllUsers();
        this.getListUserByID();
        this.getListUserAndScheduleByID();
        this.insertUser();
    }

}