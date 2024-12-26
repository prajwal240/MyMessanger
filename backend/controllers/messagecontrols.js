const { Message } = require('../models/messagedata');
const online = {};
const messages = {};

module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on('login', (user) => {
            online[user] = socket.id;
        });
        socket.on('disconnect', () => {
            for (x in online) {
                if (online[x] === socket.id) {
                    delete online[x];
                    delete messages[x];
                    break;
                }
            }
        });

        socket.on('connected', async (msg) => {
            const arr = await Message.find({
                $or: [
                    { sender: msg.sender, reciever: msg.reciever },
                    { sender: msg.reciever, reciever: msg.sender }
                ]
            });
            io.to(online[msg.sender]).emit('connected', arr);
            if (messages[msg.sender]) {
                delete messages[msg.sender];
            }
            messages[msg.sender] = msg.reciever;
        })

        socket.on('client_to_server', async (msg) => {
            const message = new Message({
                sender: msg.sender, reciever: msg.reciever, msg: msg.msg
            })
            await message.save();
            if (online[msg.reciever] && messages[msg.sender] === msg.reciever && messages[msg.reciever] === msg.sender) {
                io.to(online[msg.reciever]).emit('server_to_client', msg);
            }
        })

        socket.on('delete_msgs',async (msg)=>{
            await Message.deleteMany(
                    { sender: msg.sender, reciever: msg.reciever }
            );
            await Message.deleteMany(
                { sender: msg.reciever, reciever: msg.sender }
            )
            const arr=[];
            io.to(online[msg.sender]).emit('connected', arr);
            if(online[msg.reciever] && messages[msg.sender] === msg.reciever && messages[msg.reciever] === msg.sender){
                io.to(online[msg.reciever]).emit('connected', arr);
            }
        })

        socket.on('logout', (msg) => {
            delete online[msg.sender];
            delete messages[msg.sender];
        })
    });
}