const { io } = require('socket.io-client')
// localhost:8100
const socket = io('http://localhost:3000')

socket.on('connect', () => {
  console.log('Connected to server')
})

let DriverID = 'driver1'
//save in local storage in Angular Ionic

//UserConnect emit
socket.emit('UserConnect', {
  UserId: DriverID
})

socket.emit('ChatCreate', {
  UserId: DriverID,
  UserId2: 'user1'
})
let ChatId
socket.on('ChatCreated', data => {
  ChatId = data
  console.log(ChatId)
  socket.on('Messages', data => {
    console.log(data)
  })

  //get messaage from console and send it to user

  socket.emit('Message', {
    chatId: ChatId,
    message: 'Hello User',
    writer: 'driver'
  })
})
