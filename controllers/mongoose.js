const { mongoose } = require('mongoose')
const dotenv = require("dotenv");

dotenv.config()

function database() {
    const client = mongoose.connect(process.env.MONGO_CONNECTION_STRING);
    return client
}

module.exports = {database}