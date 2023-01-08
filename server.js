const io = require('socket.io')(3000)

let users = []
let sockets = []
let chats = []

function guid () {
  function s4 () {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }
  return (
    s4() +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    s4() +
    s4()
  )
}
console.log('Server is running')
io.on('connection', socket => {
  sockets[socket.id] = socket
  socket.on('UserConnect', data => {
    console.log('User connected')
    users[data.UserId] = socket
    sockets[socket.id] = users.find(user => user.id === data.UserId)
  })
  socket.on('ChatCreate', data => {
    let ChatId = guid()

    let User = users[data.UserId]
    let User2 = users[data.UserId2]

    chats[ChatId] = [User, User2]

    User.emit('ChatCreated', ChatId)
    User2.emit('ChatCreated', ChatId)
  })
  socket.on('Message', data => {
    //get data chat id
    let chat=chats[data.chatId];
    if (!chat) {
      console.log('Chat Not found')
      return
    }
    console.log(data)
    let json = {
      message: data.message,
      writer: data.writer // user or driver
    }

    chat.forEach(socket => {
      socket.emit('Messages', json)
    })
    //push message to chat
  })
})
io.on('disconnect', socket => {
  let myUser = sockets[socket.id]
  let UserIndex = users.findIndex(user => user.id === myUser.id)
  users.splice(UserIndex, 1)

  sockets.splice(socket.id, 1)
})
