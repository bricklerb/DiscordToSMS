import { config } from "./config";

const { Sequelize } = require('sequelize');

let sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: config.database,
    logging: false
});

export { sequelize }
