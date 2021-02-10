import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import { deleteProject } from '../../actions/projectActions';

const Project = ({deleteProject, project:{ projects }, project_id, index}) => {
	const singleProject = projects.find(x=>x._id === project_id);

	const handleDelete = () => {
		deleteProject(singleProject._id);
	}
	return (
		singleProject !== null && 
		<Draggable draggableId={singleProject._id} index={index}>
			{(provided)=> (
				<div
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
				>
					<div className="project-card">
						<div className="card-title">
							<span className="title">{singleProject.title}</span>
							<i className="fas fa-times pointer" onClick={handleDelete}></i>
						</div>
						<div className="card-description">
							{singleProject.description}
						</div>
					</div>
				</div>
				
			)}	
		</Draggable>
	)
}

Project.propTypes = {
	deleteProject: PropTypes.func.isRequired,
	project: PropTypes.object.isRequired,
	project_id: PropTypes.string.isRequired,
	index: PropTypes.number.isRequired,
}

const mapStateToProps = state => ({
	project: state.project
})

export default connect(mapStateToProps, { deleteProject })(Project);
