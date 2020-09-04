import express from 'express';
import bodyParser from 'body-parser';
import config from './config';
import mongoose from 'mongoose';
const userRoute = require('./routes/userRoutes');
const chatRoute = require('./routes/chatRoutes');

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const {Chat} = require("./models/chatModel");

const mongodbUrl = config.MONGODB_URL;
const connect = mongoose.connect(mongodbUrl, {
    useNewUrlParser : true,
    useUnifiedTopology: true ,
    useCreateIndex: true
}).catch(error => console.log(error.reason));

app.use(bodyParser.json());
app.use("/api/users", userRoute);
app.use("/api/chat", chatRoute);


io.on("connection", socket => {
    socket.on("Input Chat Message", msg => {
        connect.then(db => {
            try {
                let chat = new Chat({message:msg.message,receiver:msg.receiverid, sender:msg.userId, type:msg.type});

                chat.save((err,doc) => {
                    if(err) return res.json({ success: false, err})

                Chat.find({"_id":doc._id})
                .populate("sender")
                .exec((err,doc)=>{
                    return io.emit("Output Chat Message", doc);
                })
                })
            } catch (error) {
                console.log(error);
            }
        })
    })
})

server.listen(5050, () => {
    console.log("server started at http://localhost:5050")
})