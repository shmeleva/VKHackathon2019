import dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(".env")) {
    dotenv.config({ path: ".env" });
} else {
    console.error("Create .env file.");
    process.exit(1);
}
export const ENVIRONMENT = process.env.NODE_ENV;
const isProduction = ENVIRONMENT === "production";

export const SESSION_SECRET = process.env["SESSION_SECRET"];

if (!SESSION_SECRET) {
    console.error("Set SESSION_SECRET environment variable.");
    process.exit(1);
}

export const MONGODB_URI = isProduction ? process.env["MONGODB_URI"] : process.env["MONGODB_URI_LOCAL"];

if (!MONGODB_URI) {
    if (isProduction) {
        console.error("Set MONGODB_URI environment variable.");
    } else {
        console.error("Set MONGODB_URI_LOCAL environment variable.");
    }
    process.exit(1);
}

export const VKONTAKTE_ID = process.env["VKONTAKTE_ID"];

if (!VKONTAKTE_ID) {
    console.error("Set VKONTAKTE_ID environment variable.");
    process.exit(1);
}

export const VKONTAKTE_SECRET = process.env["VKONTAKTE_SECRET"];

if (!VKONTAKTE_SECRET) {
    console.error("Set VKONTAKTE_SECRET environment variable.");
    process.exit(1);
}

