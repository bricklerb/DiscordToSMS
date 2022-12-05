import { Repository } from "typeorm";
import { datasource, twilio } from "..";
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
        let reply = await interaction.deferReply()

        const numberRepo: Repository<PhoneNumber> = datasource.getRepository('PhoneNumber')
        const numbers = await numberRepo.find({
            where: {
                channelId: interaction.channelId as string,
                guildId: interaction.guildId as string,
            }
        });

        let channel = await interaction.guild?.channels.fetch(interaction.channel?.id as string)

        let message = `"${interaction.options.get('message')?.value as string}" `
        message += `from ${interaction.user.tag} in ${channel?.name}`

        //TODO implement Rate Limiting
        for (const phoneNumber of numbers) {
            try {
                // twilio.sendMessage(phoneNumber, message)
            } catch {

            }
        }

        try {
            await interaction.followUp('Sent!');
            await interaction.channel?.send({
                content: `${interaction.guild?.roles.everyone} ${interaction.options.get('message')?.value}`,
                allowedMentions: { parse: ['everyone'] }
            });
        } catch (exception) {
            console.log(exception)
        }
    }
}
    // repo.save()

//     {
//     content: `${interaction.guild?.roles.everyone} ${interaction.options.get('message')?.value}`,
//         allowedMentions: { parse: ['everyone'] }
// }

