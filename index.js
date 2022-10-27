const express_ = require('express');
const app =express_();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const {v4:uidv4} = require('uuid');
const urlRegex=/(((https?:\/\/)|(www\.))[^\s]+)/g;
app.use(express_.static(__dirname+'/public'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/entry.html');
});
var room_tracker=[];
var flag=1;
var room;
io.on('connection',(socket)=>{
    console.log('user connected');
    socket.on('disconnect',()=>{
        console.log("disconnect");
    });
    socket.on('user joined',(props)=>{
            io.emit('user joined',props);
    });
    socket.on("chat-message",(msg)=>{
        const as_url=msg.match(urlRegex,msg);
        const url=`<a href="${as_url}" style="color:'blue'">${as_url}</a>`;
        msg=msg.replace(as_url,url);
        io.to(room).emit("chat-message",msg);
    })
    socket.on('create-room',(id)=>{
       
        room = uidv4();
        room_tracker.push(room);
        socket.join(room)
        io.to(room).emit("roomid-return",room)
        
    })
    socket.on('join-room',(id)=>{
        console.log(id);
        if(room_tracker.length==0){
            console.log("no rooms");
            socket.emit("joinroom-error",'no rooms:please create a new room');
            
        }
        for (let i = 0; i < room_tracker.length; i++) {
            if(room_tracker[i]==id){
                room=id;
                flag=0;
                break;
            }
            
        }
        if(flag==1){
            console.log("error no room found ");
            socket.emit("joinroom-error",'error no such room found !');
        }else{
            socket.join(room);
            io.to(room).emit("roomid-return",room);
        }    
    })


})

const PORT = process.env.PORT || 3000 
http.listen(PORT,()=>{
    console.log("started server at ",PORT);
})