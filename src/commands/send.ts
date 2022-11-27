import { Client, CommandInteraction, MessagePayload } from "discord.js"
import { Repository } from "typeorm";
import { datasource } from "..";
import { PhoneNumber } from "../entities/PhoneNumber";
import { Commands } from "../interfaces/Command";

export const Command: Commands = {
    name: "send",
    description: "Sends a @Here to this channel and a text to all numbers added to this channel",
    options: [{
        type: 3,
        name: "message",
        description: "The message to be sent",
        required: true
    }],
    dm_permission: false,
    run: async (client, interaction) => {
        const numberRepo: Repository<PhoneNumber> = datasource.getRepository('PhoneNumber')
        const numbers = await numberRepo.find({
            where: {
                channelId: interaction.channelId as string,
                guildId: interaction.guildId as string,
            }
        });

        //TODO implement SMS

        interaction.reply("Sent!")

        interaction.channel?.send({
            content: `${interaction.guild?.roles.everyone} ${interaction.options.get('message')?.value}`,
            allowedMentions: { parse: ['everyone'] }
        });

    }

    // repo.save()
}

