import { Commands } from "../interfaces/Command";
import { PhoneNumber } from "../entities/PhoneNumber";
import { datasource } from "../index"
import { config } from "../utils/config";

export const Command: Commands = {
    name: "list",
    description: "lists all the phone numbers added to this channel",
    options: [],
    dm_permission: false,
    run: async (client, interaction) => {
        const repo = datasource.getRepository<PhoneNumber>('PhoneNumber')

        const numbers: PhoneNumber[] = await repo.find({
            where: {
                channelId: interaction.channelId as string,
                guildId: interaction.guildId as string,
            }
        })

        if (numbers.length > 0) {
            let message = "";
            for (let num of numbers) {
                message += formatNumber(num.number.toString()) + "\n"
            }

            interaction.reply(message);
        }
        else {
            interaction.reply("No phone numbers add to this channel")
        }
    }
}

function formatNumber(number: string): string {
    let count = 0;
    let formmattedNumber = "";
    for (const char of number) {
        if (count >= number.length - 4) {
            formmattedNumber += number.charAt(count)
        } else {
            formmattedNumber += "#"
        }
        count++;
    }

    return formmattedNumber
}

