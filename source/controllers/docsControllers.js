const indexView = (req,res)=>{
	res.render('index')
}
const loginView = (req,res)=>{
	res.render('login')
}

const registerView = (req,res)=>{
	res.render('register')
}
module.exports = {indexView,loginView,registerView}