import { CommandInteraction, Client } from 'discord.js';

interface Options {
    type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
    name: string;
    description: string;
    required?: boolean;
    options?: Options[];
};

export interface Commands {
    name: string;
    description: string;
    options?: Options[],
    dm_permission?: boolean,
    default_member_permissions?: string
    run: (client: Client, interaction: CommandInteraction) => Promise<any> | any;
};