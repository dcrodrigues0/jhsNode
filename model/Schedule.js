const Sequelize = require('sequelize');
const Connection = require('../database/Conection');
module.exports = class Schedule{
    
    constructor(schedule_date, type_service, id_user){
        this.schedule_date = schedule_date; //YYYY-MM-DD hh:mm:ss
        this.type_service = type_service;
        this.id_user = id_user;
    }

    async listAllSchedules(callback){
        const database = new Connection();
        const sequelize = database.connectDB();
        
        await sequelize.query("SELECT * FROM SCHEDULE", { type: sequelize.QueryTypes.SELECT})
        .then(schedules => {
            callback(schedules)
        }).catch((err)=>{
            console.log("Cannot do the query");
        });

        database.closeConnectionDB(sequelize);
    }

    async listScheduleByID(close,id_schedule, callback){
        const database = new Connection();
        const sequelize = database.connectDB();

        await sequelize.query(`SELECT * FROM SCHEDULE WHERE ID_SCHEDULE = ${id_schedule}`, { type: sequelize.QueryTypes.SELECT})
        .then(schedules => {
            callback(schedules);
        }).catch((err)=>{
            console.log("Cannot do the query");
        });

        if(close === 1){
            database.closeConnectionDB(sequelize);
        }
        
    }
    
    async insertSchedule(scheduleData, callback){
        const database = new Connection();
        const sequelize = database.connectDB();

        await sequelize.query(`INSERT INTO SCHEDULE (SCHEDULE_DATE, TYPE_SERVICE, ID_USER) 
            VALUES ('${scheduleData.schedule_date}', '${scheduleData.type_service}',
             ${scheduleData.id_user});`,{ type: sequelize.QueryTypes.INSERT})
        .then(result => {
            callback("ok");
        }).catch((err)=>{
            console.log("Cannot do the query err", err);
        });

        database.closeConnectionDB(sequelize);
    }

    async deleteSchedule(id_schedule, callback){
        const database = new Connection();
        const sequelize = database.connectDB();

        await sequelize.query(`DELETE FROM SCHEDULE WHERE ID_SCHEDULE = ${id_schedule};`,{ type: sequelize.QueryTypes.DELETE})
        .then(result => {
            callback("ok");
        }).catch((err)=>{
            console.log("Cannot do the query err");
        });

        database.closeConnectionDB(sequelize);
    }
    

    async updateSchedule(id_schedule,scheduleData, callback){
        const database = new Connection();
        const sequelize = database.connectDB();
        await this.listScheduleByID(0,id_schedule, (schedule)=>{
            sequelize.query(`UPDATE SCHEDULE
                SET SCHEDULE_DATE='${scheduleData.schedule_date? scheduleData.schedule_date : schedule[0].SCHEDULE_DATE}',
                TYPE_SERVICE='${scheduleData.type_service? scheduleData.type_service : schedule[0].TYPE_SERVICE}', 
                ID_USER=${scheduleData.id_user ? scheduleData.id_user : schedule[0].TYPE_SERVICE}
                WHERE ID_SCHEDULE=${id_schedule};`,{ type: sequelize.QueryTypes.UPDATE})
            .then(result => {
                callback("ok");
                database.closeConnectionDB(sequelize);
            }).catch((err)=>{
                console.log("Cannot do the query ", err);
            });
        });

    }
}
