const express = require('express')
const dotenv = require('dotenv');
const connectDB = require('./databaseConnection/connection')
const messageRouter = require('./routes/messageRouter')
const cors = require('cors');

const app = express();

dotenv.config({
    path: './.env'
})

connectDB()

const PORT = process.env.PORT

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    return res.json({
        Message: 'server message is here',
        'visit': `localhost:${PORT}/api/messages`
    })
})

app .use('/api', messageRouter);




app.listen(PORT || 8000, () => `Server is running on ${PORT}`)