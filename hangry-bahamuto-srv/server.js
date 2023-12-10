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
  // 受信したイベントの処理を記載する
  socket.on('sampleEvent', () => {
    // イベントを記載
    console.log('イベント受信成功')
    // クライアントにイベント送信
    socket.join(socket.io)
    io.to(socket.id).emit('recieveSampleEvent', '通信成功！！')
  })

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
      cards: [],
      status: status,
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
  socket.on('searchRoom', (userName, status) => {

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