const Connection = require('../database/Conection');
module.exports = class User{
    
    constructor(name,email,cellphone,spassword,superuser){
        this.name = name;
        this.email = email;
        this.cellphone = cellphone;
        this.spassword = spassword;
        this.superuser = superuser;
    }

    async listAllUsers(callback){
        const database = new Connection();
        const sequelize = database.connectDB();
        
        await sequelize.query("SELECT * FROM USER", { type: sequelize.QueryTypes.SELECT})
        .then(users => {
            callback(users)
        }).catch((err)=>{
            console.log("Cannot do the query");
        });

        database.closeConnectionDB(sequelize);
    }

    async listUserByID(close,id_user, callback){
        const database = new Connection();
        const sequelize = database.connectDB();

        await sequelize.query(`SELECT * FROM USER WHERE ID_USER = ${id_user}`, { type: sequelize.QueryTypes.SELECT})
        .then(user => {
            callback(user);
        }).catch((err)=>{
            console.log("Cannot do the query");
        });

        if(close === 1){
            database.closeConnectionDB(sequelize);
        }
        
    }

    async listUserAndScheduleByID(id_user, callback){
        const database = new Connection();
        const sequelize = database.connectDB();

        await sequelize.query(`SELECT * FROM USER U,SCHEDULE S 
            WHERE U.ID_USER = S.ID_USER AND U.ID_USER = ${id_user}`,
             { type: sequelize.QueryTypes.SELECT})
        .then(user => {
            callback(user);
        }).catch((err)=>{
            console.log("Cannot do the query");
        });

        database.closeConnectionDB(sequelize);
    }

    async insertUser(userData, callback){
        const database = new Connection();
        const sequelize = database.connectDB();

        await sequelize.query(`INSERT INTO USER (NAME, EMAIL, CELLPHONE, SPASSWORD, SUPERUSER)
            VALUES ('${userData.name}', '${userData.email}', '${userData.cellphone}', '${userData.spassword}', ${userData.superuser});`, 
            { type: sequelize.QueryTypes.INSERT})
        .then(result => {
            callback("ok");
        }).catch((err)=>{
            console.log("Cannot do the query err");
        });

        database.closeConnectionDB(sequelize);
    }

    async deleteUser(id_user, callback){
        const database = new Connection();
        const sequelize = database.connectDB();

        await sequelize.query(`DELETE FROM USER WHERE ID_USER = ${id_user};`,{ type: sequelize.QueryTypes.DELETE})
        .then(result => {
            callback("ok");
        }).catch((err)=>{
            console.log("Cannot do the query err");
        });

        database.closeConnectionDB(sequelize);
    }

    async updateUser(id_user,userData, callback){
        const database = new Connection();
        const sequelize = database.connectDB();

        await this.listUserByID(0,id_user, (user)=>{
            sequelize.query(`UPDATE USER SET NAME = '${userData.name? userData.name : user[0].NAME}',
                             EMAIL = '${userData.email? userData.email : user[0].EMAIL}',
                             CELLPHONE = '${userData.cellphone? userData.cellphone : user[0].CELLPHONE}',
                             SPASSWORD = '${userData.spassword? userData.spassword : user[0].SPASSWORD}', SUPERUSER = ${userData.superuser? userData.superuser : user[0].SUPERUSER}
                             WHERE ID_USER = ${id_user};`,{ type: sequelize.QueryTypes.UPDATE})
            .then(result => {
                callback("ok");
                database.closeConnectionDB(sequelize);
            }).catch((err)=>{
                console.log("Cannot do the query ", err);
            });
        });

    }

}
