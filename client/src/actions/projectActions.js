import {
	SET_LOADING,
	GET_PROJECTS,
	ADD_PROJECT,
	UPDATE_PROJECT,
	CHANGE_ORDER_INPHASE,
	DELETE_PROJECT,
	ERROR,
	CLEAR_ERRORS
} from './types';

import axios from 'axios';

export const getProjects = () => async dispatch => {
	try{
		clearErrors();
		const projects = await axios.get('/api/projects');
		const phases = await createPhases(projects);
		const data = projects.data
		dispatch({
			type: GET_PROJECTS,
			payload: { phases, data }
		})
	}catch(err){
		console.log(err)
		dispatch({
			type: ERROR,
			payload: "Something went wrong."
		})
	}
}

export const addProject = (project) => async dispatch => {
	try{
		const res = await axios.post('/api/projects', project, config);
		dispatch({
			type: ADD_PROJECT,
			payload: res.data
		})
	}catch(err){
		console.log(err)
		dispatch({
			type: ERROR,
			payload: "Something went wrong."
		})
	}
}

export const deleteProject = (id) => async dispatch => {
	try{
		await axios.delete(`/api/projects/${id}`);
		dispatch({type: DELETE_PROJECT, payload: id})
	}catch(err){
		console.log(err)
		dispatch({
			type: ERROR,
			payload: "Something went wrong."
		})
	}
}

export const updateProjectPhase = (result) => async dispatch => {
	try{
		const updatedProject = result.updatedProject
		const res = await axios.put(`/api/projects/${updatedProject._id}`, updatedProject, config);
		const project = res.data
		dispatch({
			type: UPDATE_PROJECT,
			payload: { result, project }
		})

	}catch(err){
		console.log(err)
		dispatch({
			type: ERROR,
			payload: "Something went wrong."
		})
	}
}

export const changeOrderInPhase = (result) => async dispatch => {
	try{
		dispatch({
			type: CHANGE_ORDER_INPHASE,
			payload: result
		})

	}catch(err){
		console.log(err)
		dispatch({
			type: ERROR,
			payload: "Something went wrong."
		})
	}
}

// Set loading to true
export const setLoading = () => {return {type: SET_LOADING}}

//Clear Errors
export const clearErrors = () => {
	return{type: CLEAR_ERRORS}
}

const createPhases = (projects) =>{
	const phases = [
			{
				id: 1,
				name: 'flowcharts',
				projectsId: projects.data.filter(x=> x.phase === 'flowcharts').map((filterdPoroject)=> filterdPoroject._id)
			},
			{
				id: 2,
				name: 'wireframes',
				projectsId: projects.data.filter(x=> x.phase === 'wireframes').map((filterdPoroject)=> filterdPoroject._id)
			},
			{
				id: 3,
				name: 'prototype',
				projectsId: projects.data.filter(x=> x.phase === 'prototype').map((filterdPoroject)=> filterdPoroject._id)
			},
			{
				id: 4,
				name: 'development',
				projectsId: projects.data.filter(x=> x.phase === 'development').map((filterdPoroject)=> filterdPoroject._id)
			},
			{
				id: 5,
				name: 'test',
				projectsId: projects.data.filter(x=> x.phase === 'test').map((filterdPoroject)=> filterdPoroject._id)
			},
			{
				id: 6,
				name: 'launch',
				projectsId: projects.data.filter(x=> x.phase === 'launch').map((filterdPoroject)=> filterdPoroject._id)
			},
		]
	return phases;

}

const config = {
	headers : {
		'Content-Type': 'application/json'
	}
}