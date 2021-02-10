import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import Phase from './Phase'

import { getProjects, updateProjectPhase, changeOrderInPhase } from '../../actions/projectActions';

const Projects = ({getProjects, updateProjectPhase, changeOrderInPhase, project:{ phases, error, loading }}) => {
	useEffect(() => {
		getProjects();
		//eslint-disable-next-line
	}, [])

	const onDragEnd = result => {
		const { destination, source, draggableId } = result;

		if(!destination){
			return;
		}
		else if(destination.droppableId === source.droppableId && destination.index === source.index){
			return;
		}else{
			const start = phases.find(x=>x.name === source.droppableId)
			const finish = phases.find(x=>x.name === destination.droppableId)
			
			if(start.id === finish.id){
				console.log('same phase')
				const phase = phases.find(x=>x.name === source.droppableId);
				const newProjects = phase.projectsId;
				newProjects.splice(source.index, 1);
				newProjects.splice(destination.index, 0, draggableId)
				const newPhase = {
					...phase,
					projectsId: newProjects
				}
				changeOrderInPhase(newPhase)
			}else{
				console.log('different phase')
				const startProjects = start.projectsId;
				startProjects.splice(source.index, 1)
				const newStart = {
					...start,
					projectsId: startProjects
				}

				const finishProjects = finish.projectsId;
				finishProjects.splice(destination.index, 0, draggableId)
				const newFinish = {
					...finish,
					projectsId: finishProjects
				}

				const updatedProject = {
					_id: draggableId,
					phase: finish.name
				}

				const obj = {
					updatedProject, newStart, newFinish
				}
				updateProjectPhase(obj)
			}
			
			
		}
	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className="projects-container">
				{ 
					loading ? <div className="loading">
							<i className="fas fa-spinner fa-2x fa-spin"></i>
	                    	<div>Loading....</div>
						</div>
					: ( error ? <div><h3 style={{textAlign: 'center'}}>{error}</h3></div>
					: (
						phases && (
							<div>
								{phases.length > 0 ? (
									<div className="phase-container">
										{
											phases.map((phase)=><Phase phase={phase} key={phase.id}/>)
										}
									</div>
								) : (
									<div><h3 style={{textAlign: 'center'}}>No projects.</h3></div>
								)}
							</div>

						)
					)
					)
				}
			</div>
		</DragDropContext>
	)
}

Projects.propTypes = {
	getProjects: PropTypes.func.isRequired,
	updateProjectPhase: PropTypes.func.isRequired,
	changeOrderInPhase: PropTypes.func.isRequired, 
	project: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	project: state.project
})

export default connect(mapStateToProps, { getProjects, updateProjectPhase, changeOrderInPhase })(Projects)