const express = require('express')
const router = express.Router();
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const { check, validationResult } = require('express-validator/check')
const User = require('../models/User')

//router to create new user
router.post('/', async (req, res) => {
	console.log(req.body)
	const { name, email, password } = req.body;
	try{
		let user = await User.findOne({email});
		if(user){
			return res.status(400).json({msg: 'User already exists'})
		}

		user = new User({
			name,
			email,
			password
		});

		//Create salt & hash
		const salt = await bcrypt.genSalt(10);

		user.password = await bcrypt.hash(password, salt);

		await user.save()
		.then(user=>{
			const payload = { id: user._id, username: user.name };
			jwt.sign(payload, config.get('jwtSecret'),{
				expiresIn: 360000
			}, (err, token) => {
				if(err) throw err;
				res.json({token, user:{_id: user._id, name:user.name, email: user.email }})
			})
		})
	} catch(err){
		console.error(err);
		res.status(500).send('Server Error')
	}

})


router.get('/', async(req,res)=>{
	try{
		const users =await User.find();
		res.json(users)

	} catch(err){
		console.error(err);
		res.status(500).send('Server Error')
	}
})



module.exports = router;