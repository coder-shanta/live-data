const { Server } = require('socket.io')

const io = new Server({
    cors: {
        origin: '*'
    }
})

let liveUser = 0;

const updateLiveUser = (simbol) => {
    if(simbol == '+') {

    io.emit('liveUser', ++liveUser)
    } else {

    io.emit('liveUser', --liveUser)
    }
}

io.on('connection', socket => {
    console.log('New User Connected');

    // Send live user count
    updateLiveUser('+')

    socket.on('message', msg => {
        console.log(msg)
        // send chat message to all user except sender
        socket.broadcast.emit('message', msg)

        // send chat message to all user
        // socket.emit('message', msg)

    })

    socket.on('disconnect', () => {
        console.log('User disconnected.');
        // Remove a user from liveUser
        updateLiveUser('-')
    })
})

io.listen(process.env.PORT)