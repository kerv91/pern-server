module.exports = (sequelize, DataTypes) => {
    const Userbars = sequelize.define('userbars', {
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        owner: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    return Userbars;
}