import { AllowedMentionsTypes, Client, Events, GatewayIntentBits } from "discord.js";
import { Bot } from "./structs/Bot";
import "reflect-metadata"
import { DataSource } from "typeorm";
import { config } from "./utils/config";
import { TwilioClient } from "./structs/TwilioClient";

export const bot = new Bot(
    new Client({
        intents: [
            GatewayIntentBits.Guilds
        ],
        allowedMentions: { parse: ['everyone'] }
    })
);

export const datasource = new DataSource({
    type: "sqlite",
    database: config.database,
    entities: ["entities/*.js"],
    logging: false,
    synchronize: true
});

export const twilio = new TwilioClient();

datasource.initialize()
    .catch((error) => console.log(error));