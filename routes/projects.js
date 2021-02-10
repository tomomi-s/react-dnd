const express = require('express')
const router = express.Router();

const Project = require('../models/Project')

//route to add a new project
router.post('/', async(req, res)=> {
	const { title, description, phase } = req.body;

	try{
		const newProject = new Project({
			title,
			description,
			phase,
			date: new Date()
		});

		let project = await newProject.save();
		res.json(project);

	}catch(err){
		console.log(err);
		res.status(500).send('Server Error')
	}
})

//route to get all projects
router.get('/', async(req, res)=> {
	try{
		const projects = await Project.find({});
		res.json(projects)
	}catch(err){
		console.log(err);
		res.status(500).send('Server Error')
	}
})
//route to update the phase of the project
router.put('/:id', async(req, res)=>{
	try{
		console.log(req.body)
		let project = await Project.findById(req.params.id);
		if(!project){
			res.json('Project not found')
		}else{
			project = await Project.findByIdAndUpdate(req.params.id, { phase: req.body.phase, date: new Date() }, { new: true });
			res.json(project);
		}
	}catch(err){
		console.log(err);
		res.status(500).send('Server Error')
	}
})

//route to delete a project
router.delete('/:id', async(req, res)=> {
	try{
		const project = await Project.findById(req.params.id);
		if(!project){
			res.json('Project not found')
		}else{
			await Project.findByIdAndRemove(req.params.id);
			res.json('Project removed');
		}
	}catch(err){
		console.log(err);
		res.status(500).send('Server Error')
	}
})

module.exports = router;