const Sequelize = require('sequelize');

const sequelize = new Sequelize('DoggoAppServer', 'postgres', 'esmeralda91', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log('Connected to DoggoApp postgres database');
    },
    function(err){
        console.log(err);
    }
);

module.exports = sequelize;