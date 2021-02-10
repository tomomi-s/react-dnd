import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Project from './Project';
import { Droppable } from 'react-beautiful-dnd';

const Phase = ({phase:{ id, name, projectsId }}) => {
	return (
		<div className="phase">
			<Droppable droppableId={name}>
				{(provided) => (
					<div 
						ref={provided.innerRef}
						{...provided.droppableProps}
						className="phase-drop"
					>
					{
						projectsId.map((project, index)=> <Project project_id={project} key={project} index={index}/>)
					}
					{provided.placeholder}
					</div>
				)}
			</Droppable>
			
		</div>
	)
}

Phase.propTypes = {
	phase: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	project: state.project
})

export default connect(mapStateToProps, {})(Phase)