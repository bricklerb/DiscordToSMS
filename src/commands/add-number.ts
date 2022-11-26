import { Commands } from "../interfaces/Command";
import { PhoneNumber } from "../entities/PhoneNumber";
import { datasource } from "../index"

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
            const phoneNumRepo = datasource.getRepository('PhoneNumber')

            let newPhoneNumber = new PhoneNumber();
            newPhoneNumber.number = numString as number
            newPhoneNumber.guildId = interaction.guildId as string
            newPhoneNumber.channelId = interaction.channelId
            await phoneNumRepo.save(newPhoneNumber)

            interaction.reply("Number added!")
        }
    }
}

