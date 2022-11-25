import { Config } from "../interfaces/Config";

let config: Config;

try {
    config = require("../../config.json")
} catch (error) {
    console.log(error)
}

export { config };