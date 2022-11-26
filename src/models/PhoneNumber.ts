import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import { sequelize } from '../utils/database'

export class PhoneNumber extends Model<
    InferAttributes<PhoneNumber>,
    InferCreationAttributes<PhoneNumber>> {
    declare number: number
    declare guildId: string
    declare channelId: string
}

PhoneNumber.init({
    number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    guildId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    channelId: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {
        sequelize,
        modelName: 'PhoneNumber'
    }
);