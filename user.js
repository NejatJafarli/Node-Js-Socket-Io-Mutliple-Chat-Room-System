const { io } = require('socket.io-client')
// localhost:8100
const socket = io('http://localhost:3000')

socket.on('connect', () => {
  console.log('Connected to server')
})

let UserID = 'user1'
//save in local storage in Angular Ionic

socket.emit('UserConnect', {
  UserId: UserID
})
let ChatId

socket.on('ChatCreated', data => {
  ChatId = data
  console.log(ChatId)

  socket.on('Messages', data => {
    console.log(data)
  })
  //sleep 5 seconds
  setTimeout(() => {
    socket.emit('Message', {
      chatId: ChatId,
      message: 'Hello Driver',
      writer: 'user'
    })
  }, 5000)
})
