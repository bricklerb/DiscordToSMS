import { Client, Events, GatewayIntentBits } from "discord.js";
import { Bot } from "./structs/Bot";
import "reflect-metadata"
import { DataSource } from "typeorm";
import { config } from "./utils/config";

export const bot = new Bot(
    new Client({
        intents: [
            GatewayIntentBits.Guilds
        ]
    })
);

export const datasource = new DataSource({
    type: "sqlite",
    database: config.database,
    entities: ["entities/*.js"],
    logging: false,
    synchronize: true
});

datasource.initialize()
    .catch((error) => console.log(error));