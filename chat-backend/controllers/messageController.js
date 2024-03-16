const ChatMessage = require("../models/ChatMessage");



const messageReceive = async (req, res) => {
    try {
        const message = await ChatMessage.find();
        return res.json(message);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
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

        return res
        .status(201)
        .json({newMessage});

    } catch (error) {
        console.error("posting message error: ", error);
        return res
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