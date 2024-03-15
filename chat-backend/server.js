const express = require('express')

const app = express();
const PORT = process.env.PORT


app.get('/', (req, res) => {
    return res.json({
        Message: 'server message is here'
    })
})


app.listen(PORT || 8000, () => `Server is running on ${PORT}`)