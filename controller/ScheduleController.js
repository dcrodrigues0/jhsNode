const Schedule = require('../model/Schedule');

module.exports = class UserController {

    constructor(server){
        this.server = server;
    }

    getListAllSchedules(){
        function respond(req, res, next) {
            const schedule = new Schedule();
            schedule.listAllSchedules((schedules)=>{
                res.send(schedules);
                next();
            });
        }
        this.server.get('/getschedules', respond);
    }

    getListScheduleByID(){
        function respond(req, res, next) {
            const schedule = new Schedule();
            schedule.listScheduleByID(1,req.params.id,(schedule)=>{
                res.send(schedule);
                next();
            });
        }
        this.server.get('/getschedule/:id', respond);
    }


    insertSchedule(restify){
        function respond(req, res, next) {
            const schedule = new Schedule();
            var scheduleData = req.body;
            if (!req.is('application/json')) {
                return next(
                    new errors.InvalidContentError("Expects 'application/json'"),
                );
            }
            schedule.insertSchedule(scheduleData,(status)=>{
                res.send(status);
                next();
            });
        }
        this.server.use(restify.plugins.bodyParser());
        this.server.post('/insertschedule',respond);
    }

    deleteSchedule(){
        function respond(req, res, next) {
            const schedule = new Schedule();
            schedule.deleteSchedule(req.params.id,(status)=>{
                res.send(status);
                next();
            });
        }
        this.server.del('/deleteschedule/:id',respond);
    }

    updateSchedule(restify){
        function respond(req, res, next) {
            const schedule = new Schedule();
            var userData = req.body;
            if (!req.is('application/json')) {
                return next(
                    new errors.InvalidContentError("Expects 'application/json'"),
                );
            }
            schedule.updateSchedule(req.params.id,userData,(status)=>{
                res.send(status);
                next();
            });
        }
        this.server.use(restify.plugins.bodyParser());
        this.server.put('/updateschedule/:id',respond);
    }
    

    loadRoutes(restify){
        this.getListAllSchedules();
        this.getListScheduleByID();
        this.insertSchedule(restify);
        this.deleteSchedule();
        this.updateSchedule(restify);
    }

}