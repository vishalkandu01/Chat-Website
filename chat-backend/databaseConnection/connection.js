const mongoose = require('mongoose');

const connectDB = async () => {

    const mongoUri = process.env.MONGO_URI
    const dbName = process.env.DB_NAME

    try {
        const connectionInstance = await mongoose.connect(`${mongoUri}/${dbName}`)
        console.log(`Database Connected !! DB HOST:${connectionInstance.connection.host}`)
    } catch (error) {
        console.error("Database Connection error: ", error)
        process.exit(1)
    }
}

module.exports = connectDB