const express = require('express')
const {urlencoded} = express
const cookieParser = require('cookie-parser');
const router = new express.Router()
const md5 = require('blueimp-md5')
const Users = require('../model/users')
const {sendCode, randomCode} = require('../utils/sms_util')

// 请求体转译
router.use(urlencoded({extended: true}))
router.use(cookieParser())
router.get('/',(req,res)=>{
	res.send('测试-服务器返回响应')
})
// 获取验证码
router.post('/getCaptcha', async (req, res)=>{
	let num = randomCode(6)
	const {tel} = (req.body)
	console.log(tel)
	req.session.user = {tel,num}
	let reg = new RegExp(/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/)
	try{
		const user = await Users.findOne({tel})
		if(user){
			if(reg.test(tel)){
				console.log(num)
				sendCode(tel + '',num , function (success) {
					console.log(success);
				})
				res.json({
					code: 200,
					msg: '登录成功',
					data: {
						code: num
					}
				})
			}else{
				res.json({
					code: 1,
					msg: '手机号不合法'
				})
			}
		}else{
			if(reg.test(tel)){
				let num = randomCode(6)
				console.log(num)
				sendCode(tel + '',num , function (success) {
					console.log(success);
				})
				res.json({
					code: 200,
					msg: '请注册用户名',
					data: {
						code: num
					}
				})
			}else{
				res.json({
					code: 1,
					msg: '手机号不合法'
				})
			}
		}
	}catch(e){
		console.log('error',e)
		res.json({
			code:2, msg: '网络不稳，请刷新重试。'
		})
	}
})

// 手机号登录
router.post('/telLogin',async (req,res) =>{
	const {tel} = (req.body)
	console.log(req.session)
	console.log(req.session.user,'tel:' + tel)
	try {
		const user = await Users.findOne({tel})
		if(req.session.user.tel === tel){
			res.json({
				code: 200,
				msg: '登录成功',
				data: {
					user
				}
			})
		}
	}catch(e){
		console.log(e)
		res.json({
			code:2, msg: '网络不稳，请刷新重试。'
		})
	}
	/*try{
		const user = await Users.findOne({tel})
		if(user){
			let num = randomCode(6)
			// sendCode(tel + '',num , function (success) {
			// 	console.log(success);
			// })
			console.log(num)
			res.json({
				code: 200,
				msg: '请注册用户名',
				data: {
					code: num
				}
			})
		}else{
			res.json({
				code: 200,
				msg: '账号未注册！',
				data: undefined
			})
		}
	}catch(e){
		console.log(e)
		res.json({
			code:2, msg: '网络不稳，请刷新重试。'
		})
	}*/
})
// 注册接口
router.post('/register',async (req, res) => {
	// console.log(req.body)
	// 请求体中可拓展属性 例：type
	const {username, password, tel} = (req.body)
	try{
		const user = await Users.findOne({username})
		const telFind = await Users.findOne({tel})
		if(user){
			if(telFind){
				res.json({
					code: 1,
					msg: '该手机号已注册'
				})
			}else{
				res.json({
					code: 1,
					msg: '用户已存在'
				})
			}
		}else{
			// create中可加入type属性
			console.log(tel)
			const user = await Users.create({username, password: md5(password), tel})
			res.json({
				code: 200,
				data:{
					username: user.username,
					_id: user.id
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
					username: user.username,
					tel: user.tel,
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
