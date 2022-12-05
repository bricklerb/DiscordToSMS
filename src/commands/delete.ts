import { Commands } from "../interfaces/Command";
import { PhoneNumber } from "../entities/PhoneNumber";
import { datasource } from "../index"

export const Command: Commands = {
    name: "delete",
    description: "deletes a number or all numbers in channel",
    options: [{
        type: 3,
        name: "input",
        description: "The id, alias, or number to delete",
        required: false
    }],
    dm_permission: false,
    default_member_permissions: "0",
    run: async (client, interaction) => {
        await interaction.reply("Processing...")

        const repo = datasource.getRepository<PhoneNumber>('PhoneNumber')

        const numbers: PhoneNumber[] = await repo.find({
            where: {
                channelId: interaction.channelId as string,
                guildId: interaction.guildId as string,
            }
        })

        let userInput = interaction.options.get('input')?.value

        if (userInput === undefined) {
            await repo.remove(numbers)
            await interaction.editReply("All numbers deleted!")
            return
        }

        let remove = false;
        for (const num of numbers) {
            if (num.alias === userInput) {
                remove = true;
            } else if (num.alias === null && num.id === userInput) {
                remove = true;
            } else if (num.number == userInput as number) {
                remove = true;
            }

            if (remove) {
                repo.remove(num);
            }
        }

        if (remove) {
            interaction.editReply('Deleted!')
        } else {
            interaction.editReply('No numbers match input.')
        }
    }
}
