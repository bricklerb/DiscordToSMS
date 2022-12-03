import { Commands } from "../interfaces/Command";
import { PhoneNumber } from "../entities/PhoneNumber";
import { datasource } from "../index"
import { config } from "../utils/config";
import { stringifyStyle } from "@vue/shared";

export const Command: Commands = {
    name: "add_phone",
    description: "Adds a phone number to send to for this channel",
    options: [{
        type: 3,
        name: "phone",
        description: "The phone number to add",
        required: true
    },
    {
        type: 3,
        name: "alias",
        description: "Alias of the number",
        required: false,
    }],
    default_member_permissions: "0",
    dm_permission: false,
    run: async (client, interaction) => {
        const numString = interaction.options.get('phone')?.value

        if (isNaN(numString as number)) {
            await interaction.reply(`${numString} is not a valid phone number.`)
        } else {
            const phoneNumRepo = datasource.getRepository('PhoneNumber')

            let newPhoneNumber = new PhoneNumber();
            newPhoneNumber.number = numString as number
            newPhoneNumber.guildId = interaction.guildId as string
            newPhoneNumber.channelId = interaction.channelId

            if (interaction.options.get('alias')?.value != null) {
                newPhoneNumber.alias = interaction.options.get('alias')?.value as string
            }

            await phoneNumRepo.save(newPhoneNumber)
                .catch(async error => {
                    if (error.errno = 19) {
                        await interaction.reply("Phone number already added to channel.")
                    }
                });
        }

        if (!interaction.replied) {
            await interaction.reply('Number added to channel!')
        }
    }
}

