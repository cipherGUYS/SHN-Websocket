const express_ = require('express');
const app =express_();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const urlRegex=/(((https?:\/\/)|(www\.))[^\s]+)/g;
app.use(express_.static(__dirname+'/public'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/entry.html');
});

io.on('connection',(socket)=>{
    console.log('user connected');
    socket.on('disconnect',()=>{
        console.log("disconnect");
    });
    socket.on('user joined',(props)=>{
            io.emit('user joined',props);
    });
    socket.on("chat-message",(msg,isurl)=>{
        const as_url=msg.match(urlRegex,msg);
        const url=`<a href="${as_url}" style="color:'blue'">${as_url}</a>`;
        msg=msg.replace(as_url,url);
        console.log(msg);
                io.emit("chat-message",msg);
    })
    socket.on('create-room',(id)=>{
       
        room = 10;
        socket.to(room).emit("newmessage",'hello from room !')
        app.get('/room/:id',(req,res)=>{
            console.log(req.params.id);
            res.sendFile(__dirname+'/index.html')
        })
        
    })
    socket.on('join-room',(id)=>{
       
        room = id;
        
        app.get('/joinroom/:props',(req,res)=>{
            console.log(req.params.props);
            res.sendFile(__dirname+'/index.html')
        })
        socket.join(id);
        socket.on("newmessage",()=>{
            io.to(room).emit("newmessage","hello this from room")
        })
        
    })


})

const PORT = process.env.PORT || 5500
http.listen(PORT,()=>{
    console.log("started server at ",PORT);
})
