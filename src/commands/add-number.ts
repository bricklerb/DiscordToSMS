import { Commands } from "../interfaces/Command";
import { PhoneNumber } from "../models/PhoneNumber";

export const Command: Commands = {
    name: "add_phone",
    description: "Adds a phone number to send to for this channel",
    options: [{
        type: 3,
        name: "phone",
        description: "The phone number to add",
        required: true
    }],
    dm_permission: false,
    run: async (client, interaction) => {
        const numString = interaction.options.get('phone')?.value

        if (isNaN(numString as number)) {
            interaction.reply(`${numString} is not a valid phone number.`)
        } else {
            await PhoneNumber.create({
                number: numString as number,
                guildId: interaction.guildId as string,
                channelId: interaction.channelId
            });

            interaction.reply("Number added!")
        }
    }
}

