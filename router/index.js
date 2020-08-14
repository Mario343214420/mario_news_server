const express = require('express')
const cookieParser = require('cookie-parser');
const router = new express.Router()
const md5 = require('blueimp-md5')
// const Users = require('../model/users')

// 请求体转译
router.use(express.urlencoded({extended: true}))
router.use(cookieParser())
router.get('/',(req,res)=>{
	res.send('测试-服务器返回响应')
})
// 注册接口
router.post('/register',async (req, res) => {
	// console.log(req.body)
	const {username, password, type} = (req.body)
	try{
		const user = await Users.findOne({username})
		if(user){
			res.json({
				code: 1,
				msg: '用户已存在'
			})
		}else{
			const user = await Users.create({username, password: md5(password)}, type)
			res.json({
				code: 0,
				data:{
					username: user.username,
					_id: user.id,
					type: user.type
				}
			})
		}
	}catch(e){
		console.log(e)
		res.json({
			code:2, msg: '网络不稳，请刷新重试。'
		})
	}
})
// 登录接口
router.post('/login',async (req, res) => {
	const {username, password} = (req.body)
	try{
		const user = await Users.findOne({username, password: md5(password)})
		if(user){
			res.json({
				code: 200,
				msg: '登录成功！',
				data: {
					_id: user.id,
					type: user.type,
					username: user.username,
					post: user.post,
					info: user.info
				}
			})
		}else{
			res.json({
				code: 400,
				data:{
					username: user.username,
					_id: user.id
				},
				msg: '用户名或密码错误'
			})
		}
	}catch(e){
		console.log(e)
		res.json({
			code:2, msg: '网络不稳，请刷新重试。'
		})
	}
})
module.exports = router;
