const Sequelize = require('sequelize');
const Connection = require('../database/Conection');
module.exports = class User{
    
    constructor(name,email,cellphone,spassword,superuser){
        this.name = name;
        this.email = email;
        this.cellphone = cellphone;
        this.spassword = spassword;
        this.superuser = superuser;
    }

    getName(){
        return this.name;
    }

    getEmail(){
        return this.email;
    }

    getCellphone(){
        return this.cellphone;
    }

    getSpassword(){
        return this.spassword;
    }

    getSuperuser(){
        return this.superuser;
    }

    setName(name){
        this.name = name;
    }

    setEmail(email){
        this.email = email;
    }

    setCellphone(cellphone){
        this.cellphone = cellphone;
    }

    setSpassword(spassword){
        this.spassword = spassword;
    }

    setSuperuser(superuser){
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

    async listUserByID(id_user, callback){
        const database = new Connection();
        const sequelize = database.connectDB();

        await sequelize.query(`SELECT * FROM USER WHERE ID_USER = ${id_user}`, { type: sequelize.QueryTypes.SELECT})
        .then(user => {
            callback(user);
        }).catch((err)=>{
            console.log("Cannot do the query");
        });

        database.closeConnectionDB(sequelize);
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
            { type: sequelize.QueryTypes.SELECT})
        .then(user => {
            callback(user);
        }).catch((err)=>{
            console.log("Cannot do the query");
        });

        database.closeConnectionDB(sequelize);
    }

}
