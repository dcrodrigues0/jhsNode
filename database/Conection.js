const Sequelize = require('sequelize');

module.exports = class Conection{
    
    connectDB(){
        const sequelize = new Sequelize('jhsDB', 'root', 'xxxx', {
            host: 'localhost',
            dialect: 'mysql'
        });
        return sequelize;
    }

    closeConnectionDB(sequelize){
        sequelize.close();
        console.log("Connection ended")
    }

    checkStatusConnection(sequelize){
        sequelize
        .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
    }
    
}