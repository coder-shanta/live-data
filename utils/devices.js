const devices = []

// Connect user to server
const deviceConnect = (id, name, ip, room) => {
    const device = { id, name, ip, room }

    devices.push(device)

    return device
}

// Get current Device
const getCurrentDevice = id => {
    return devices.find(device => devices.id === id)
}

// Device Disconnect
const deviceDisconnect = id => {
    const idx = devices.findIndex(device => device.id === id)

    if(idx !== -1) {
        return devices.splice(idx, 1)[0]
    }
}

// Get Connected Devices
const getConnectedDevices = room => {
    return devices.filter(device => device.room === room)
}

module.exports = {
  deviceConnect,
  deviceDisconnect,
  getCurrentDevice,
  getConnectedDevices
};