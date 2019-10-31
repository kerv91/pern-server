module.exports = (sequelize, DataTypes) => {
    const Bars = sequelize.define('bars', {
        bar: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: { 
            type: DataTypes.STRING,  
            allowNull: false 
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return Bars;
}