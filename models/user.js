module.exports = function(sequelize, DataTypes) {

    return sequelize.define('user', {
        username: {
            unique: true,
            type: DataTypes.STRING
        },
        passwordhash: DataTypes.STRING
    });
};