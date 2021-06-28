const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {

    sequelize.define('operation', {
        concept: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mount: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM("entry", "egress"),
            defaultValue: "entry"
        },
    });
};