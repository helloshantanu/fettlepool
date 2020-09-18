const mongoose = require("mongoose")
const db_host = process.env.DB_HOST
const db_port = process.env.DB_PORT
const db_name = process.env.DB_NAME
const resources = mongoose.createConnection(`mongodb://${db_host}:${db_port}/${db_name}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

module.exports = {
    resources
}