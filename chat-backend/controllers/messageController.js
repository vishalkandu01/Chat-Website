const ChatMessage = require("../models/ChatMessage");



const messageReceive = async (req, res) => {
    try {
        const message = await ChatMessage.find();
        res.json(message);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}


const messageSend = async (req, res) => {
    try {
        const {user, message} = req.body;
        if(!user || !message) {
            return res
            .status(400)
            .json({
                error: "User and message requred"
            })
        }

        const newMessage = new ChatMessage({
            user, 
            message
        })

        await newMessage.save();

        res
        .status(201)
        .json({newMessage});

    } catch (error) {
        console.error("posting message error: ", error);
        res
        .status(500)
        .json({
            error: "Internal Server Error"
        })
    }
}

module.exports = {
    messageReceive,
    messageSend
}