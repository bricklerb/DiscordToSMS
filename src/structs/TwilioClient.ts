import { Twilio } from 'twilio'
import { PhoneNumber } from "../entities/PhoneNumber";
import { config } from "../utils/config";

export class TwilioClient {

    private client: Twilio;

    public constructor() {
        this.client = new Twilio(config.twilioAccountSID, config.twilioAuthToken)
    }

    public async sendMessage(phoneNumber: PhoneNumber, message: string) {
        return await this.client.messages.create({ body: message, from: config.twilioNumber, to: phoneNumber.number.toString(), maxPrice: 0.05 })
    }

    public async getMessageStatus(sid: string) {
        return this.client.messages(sid).fetch()
    }
}