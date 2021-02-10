import {
	SET_LOADING,
	GET_PROJECTS,
	ADD_PROJECT,
	UPDATE_PROJECT,
	CHANGE_ORDER_INPHASE,
	DELETE_PROJECT,
	ERROR,
	CLEAR_ERRORS
} from '../actions/types';

const initialState = {
	projects: null,
	phases: null,
	loading: false,
	error: null
}

export default (state = initialState, action) => {
	switch(action.type){
		case SET_LOADING: 
			return {
				...state,
				loading: true
			}
		case GET_PROJECTS:
			return{
				...state,
				projects: action.payload.data,
				phases: action.payload.phases,
				loading: false
			}
		case ADD_PROJECT:
			const phase = state.phases.find(phase=>phase.name === action.payload.phase);
			const newProjects = phase.projectsId;
			newProjects.push(action.payload._id)
			const newPhase = {
				...phase,
				projectsId: newProjects
			}
			return{
				...state,
				phases: state.phases.map(phase=> phase.name === action.payload.name ? newPhase : phase),
				projects: [...state.projects, action.payload]
			}
		case UPDATE_PROJECT:
			return{
				...state,
				phases: state.phases.map(phase=> phase.id === action.payload.id ? action.payload : phase),
				projects: state.projects.map(project=> project._id === action.payload.project._id ? action.payload.project : project)
			}
		case CHANGE_ORDER_INPHASE:
			return{
				...state,
				phases: state.phases.map(phase=> phase.id === action.payload.id ? action.payload : phase)
			}
		case DELETE_PROJECT:
			const filteredIds = state.phases.map((phase)=>{
				return {...phase, projectsId:phase.projectsId.filter(id=> id !== action.payload)}
			})
			return{
				...state,
				phases: filteredIds,
				projects: state.projects.filter(project=>project._id !== action.payload)
			}
		case ERROR: 
			return{
				...state,
				error: action.payload,
				loading: false
			}
		case CLEAR_ERRORS:
			return{
				...state,
				error: null
			}
		default:
			return state;
	}
}