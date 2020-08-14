const port = 4000
const express = require('express');
const router = require('./router');
const db = require('./db');
const app = express();
// const http = require('http')
// const server = http.createServer(app);
// server.listen('5000', () => {
// 	console.log('socketio服务器启动成功, 请访问: http://localhost:5000')
// });
(async () => {
	await db;
	app.use(router);
})();
app.listen(port, err =>
	err ? console.log(err) :
		console.log(`服务器启动成功了~请访问：http://localhost:${port}`)
)
