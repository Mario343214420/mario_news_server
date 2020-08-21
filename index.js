const port = 4000
const express = require('express');
const session = require('express-session')
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
app.use(session({
	// 服务端 session 签名
	secret: 'mario',
	// 服务端返回的key（默认：connect.sid）
	// name: 'userCaptcha',
	// 保留时间
	cookie: {
		maxAge: 60000
	},
	// 默认为true，强制保存，即使不变
	resave: false,
	// 每次请求时强行设置 cookie，会重置 cookie 过期时间（默认：false）
	rolling: false,
	// 强制存储未初始化的 session （默认：true）
	saveUninitialized: true
}))
app.listen(port, err =>
	err ? console.log(err) :
		console.log(`服务器启动成功了~请访问：http://localhost:${port}`)
)
