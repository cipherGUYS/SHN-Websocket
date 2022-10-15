const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
});
io.on('connection',(socket)=>{
    console.log('user connected');
    socket.on('disconnect',()=>{
        console.log("disconnect");
    });
    socket.on('user joined',(props)=>{
            io.emit('user joined',props);
    });
    socket.on("chat-message",(msg)=>{
        io.emit("chat-message",msg);
    })
})
http.listen(process.env.PORT || 3000,()=>{
    console.log("started server at 3000");
})