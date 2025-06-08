const { json } = require("express");
const chatModel = require("../models/chatModel")
const userModel = require("../models/userModel")

const getChat = async (req, res) => {
    console.log(req.body)
    const { userId } = req.body;
    if (!userId) {
        return res.status(404).send("user not found")
    }

    var Chat = await chatModel.find({
        isGroupChat: false,
        users: { $all: [req.body.token._id, userId] },
    })
        .populate("users", "-password")
        .populate("latestMessage")

    Chat = await userModel.populate(Chat, {
        path: "latestMessage.sender",
        select: "name pic email"
    });
    console.log(Chat)
    if (Chat.length > 0) { res.status(202).send(Chat[0]) }
    else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.body.token._id, userId]
        };
        console.log(chatData)

        try {
            const cretedChat = await chatModel.create(chatData);
            const FullChat = await chatModel.findOne({ _id: cretedChat._id }).populate(
                "users",
                "-password"
            );
            res.status(200).send(FullChat);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
}

const GetAllchat = async (req, res) => {
    try {
        const { _id } = req.body.token
        let data = await chatModel.find({ users: { $elemMatch: { $eq: _id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
        data = await userModel.populate(data, {
            path: "latestMessage.sender",
            select: "name pic email"
        });
        res.status(200).send({ data: data })
    } catch (error) {
        res.status(500).send({ error: error.message })
    }

}

const CreateGroupChat = async (req, res) => {
    try {
        const data = req.body
        let { chatName, users } = data
        const currentUser = req.body.token._id
        if (!chatName || !users) {
            return res.status(401).send({ message: "Please fill the required feilds" })
        }
        users = JSON.parse(users)
        console.log(users)
        users.push(currentUser)
        if (users.length < 3) {
            return res
                .status(400)
                .send("More than 2 users are required to form a group chat");
        }
        data.isGroupChat = true
        data.users = users
        data.groupAdmin = currentUser

        const chat = await chatModel.create(data)
        const tosend = await chatModel.findById(chat._id).populate("users", "-password").populate("groupAdmin", "-password")
        res.status(201).send({ data: tosend })



    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

const reNameGC = async (req, res) => {
    try {
        console.log(req.body)
        const { chatID, chatName, token } = req.body
        const Chatdata = await chatModel.findOne({ _id: chatID })
        if (!Chatdata) { return res.status(404).send({ message: "chat not found" }) }
        if (token._id != Chatdata.groupAdmin._id) return res.status(403).send({ message: "not Authorized" })
        const data = await chatModel.findOneAndUpdate({ _id: chatID }, { chatName: chatName }, { new: true }).populate("users", "-password").populate("groupAdmin", "-password")
        console.log({ data: data })
        res.status(200).send({ data: data })
    } catch (error) {
        res.status(500).send({ messsage: error.message })
    }
}

const addToGC = async (req, res) => {
    try {
        const { userId, ChatID, token } = req.body
        console.log(req.body)
        if (!userId || !ChatID) return res.status(400).send({ message: "please fill the required feilds" })
        const Chatdata = await chatModel.findOne({ _id: ChatID })
        if (!Chatdata) return res.status(400).send({ message: "Chat not found" })
        if (Chatdata.users.includes(userId)) return res.status(400).send({ message: "user already in this group" })
        if (token._id != Chatdata.groupAdmin._id) return res.status(403).send({ message: "not Authorized" })
        const data = await chatModel.findOneAndUpdate({ _id: ChatID }, { $push: { users: userId } }, { new: true }).populate("users", "-password").populate("groupAdmin", "-password")
        res.status(200).send({ data: data })
    } catch (err) {
        res.status(500).send({ message: err.message })
    }

}

const rmToGC = async (req, res) => {
    try {
        const { userId, ChatID, token } = req.body
        console.log(req.body)
        if (!userId || !ChatID) return res.status(400).send({ message: "please fill the required feilds" })
        const Chatdata = await chatModel.findOne({ _id: ChatID })
        if (!Chatdata) return res.status(400).send({ message: "Chat not found" })
        if (!Chatdata.users.includes(userId)) return res.status(400).send({ message: "user not present in the group" })
        if (token._id != Chatdata.groupAdmin._id) return res.status(403).send({ message: "not Authorized" })
        const data = await chatModel.findOneAndUpdate({ _id: ChatID }, { $pull: { users: userId } }, { new: true }).populate("users", "-password").populate("groupAdmin", "-password")
        res.status(200).send({ data: data })
    } catch (err) {
        res.status(500).send({ message: err.message })
    }

}



module.exports = { getChat, GetAllchat, CreateGroupChat, reNameGC, addToGC,rmToGC }