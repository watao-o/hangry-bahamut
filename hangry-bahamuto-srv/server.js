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

http.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port' + (process.env.PORT || 3000));
});

io.on('connection', (socket) => {
  console.log('疎通成功')
  console.log(socket)
  // 受信したイベントの処理を記載する
  socket.on('sampleEvent', () => {
    // イベントを記載
    console.log('イベント受信成功')
    // クライアントにイベント送信
    socket.join(socket.io)
    io.to(socket.id).emit('recieveSampleEvent', '通信成功！！')
  })
})