const http = require('http').createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
});
const io = require("socket.io")(http, {
  cors: {
    origin: [
      'http://localhost:8080'
    ],
   },
});

// ルーム情報
const rooms = [];

http.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port' + (process.env.PORT || 3000));
});

io.on('connection', (socket) => {
  console.log('接続:', socket.id)
  // console.log(socket)
  
  // 部屋を作成する
  socket.on('createRoom', (userName, status) => {
    if (userName == "") {
      console.log('名前を入力してください')
      io.to(socket.id).emit("notifyError", "名前を入力してください");
      return;
    }
    const roomId = generateRoomId()
    const user = {
      socketId: socket.id,
      name: userName,
      roomId,
      cards: []
    };
    const room = {
      id: roomId,
      users: [user],
      gameStart: false
    }
    rooms.push(room)
    socket.join(roomId)
    io.to(socket.id).emit("updateRoom", room, room.users.length)
  })
  // 部屋を検索する
  socket.on('searchRoom', () => {
    console.log('ルーム検索')
    console.log('rooms:', rooms)
    roomIdList = rooms.map(r => r.id)
    console.log('roomIdList:', roomIdList)
    io.to(socket.id).emit('resultSearchRoom', roomIdList)
  })
  // 部屋に入室する
  socket.on('enterRoom', (userName, roomId) => {
    console.log('ルーム入室')
    console.log('  userName, roomId:', userName, roomId)
    console.log('  rooms:', rooms)
    // ルームIDからルームオブジェクトを取得
    const joinRoom = rooms.find(r => r.id === roomId)
    console.log('  参加する部屋：', joinRoom)

    // ユーザ情報作成
    const user = {
      socketId: socket.id,
      name: userName,
      roomId,
      cards: []
    };
    joinRoom.users.push(user)
    socket.join(roomId)
    console.log('参加後のrooms:', JSON.stringify(rooms, null, 2))
    // io.to(socket.id).emit("updateRoom", room, room.users.length)
  })
  
})

// ランダムなroomId(1000~9999)を生成する
function generateRoomId() {
  const id = Math.floor(Math.random() * 8999 + 1000);
  if (rooms.some((r) => r.id == id)) {
    // ランダムに生成したidが既に存在する場合は作り直す
    return generateRoomId();
  }
  return id;
}