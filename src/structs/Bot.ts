import { Client, Collection, Events, REST, Routes } from "discord.js";
import { config } from "../utils/config";
import { Commands } from "../interfaces/Command";
import fs from 'fs';
import path from 'path';

export class Bot {
    public commands: Collection<string, Commands> = new Collection();

    public constructor(public readonly client: Client) {
        this.client.login(config.token).then(() => {
            console.log(`Connected to discord ${this.client.user?.tag}`)
        });

        const rest = new REST({ version: "10" })
            .setToken(config.token);

        fs.readdir(path.join(__dirname, '../commands'), (err, commands: string[]) => {
            if (err) throw new Error(err.message);
            commands
                .filter((command: string) => command.endsWith('.js'))
                .forEach(async (command: string) => {
                    try {
                        const { Command }: { Command: Commands } = await import(`../commands/${command}`);
                        this.commands.set(Command.name, Command);
                    } catch (err) {
                        console.error(err);
                    };
                });
        });

        this.client.once(Events.ClientReady, async () => {
            try {
                console.log('(*) Started loading application [/] commands...');
                await rest.put(Routes.applicationCommands(this.client.user!.id), { body: this.commands.toJSON() });
                console.log(`(*) Successfully loaded application [${this.commands.size}] commands!`);
            } catch (err) {
                console.error(err);
            };
        });

        this.client.once(Events.Error, console.error);

        this.client.on(Events.InteractionCreate, async interaction => {
            try {
                if (!interaction.isCommand()) return;
                const command = this.commands.find(cmd => cmd.name == interaction.commandName);
                if (!command) return;
                command.run(this.client, interaction);
            } catch (err) {
                console.error(err);
            };
        });
    }
}
