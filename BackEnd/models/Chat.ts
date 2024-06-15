import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }
},{
    timestamps: true
})

const Chat = mongoose.model("Chat", ChatSchema);

export default Chat