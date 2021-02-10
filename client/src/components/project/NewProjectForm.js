import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addProject } from '../../actions/projectActions';

const NewProjectForm = ({addProject}) => {
	const initState = {
		title: '',
		description: '',
		phase: 'flowcharts'
	}
	const [project, setProject] = useState(initState)
 
	const { title, description } = project;

	const handleSubmit = () => {
		addProject(project);
		setProject(initState)
	}
	return (
		<div className="new-project-container">
			<div className="new-project-header">
				<span>New project</span>
				<i className="fas fa-chevron-down pointer"></i>
			</div>
			<input 
				className="form title-input"
				type="text" 
				placeholder="Project Title"
				name="title"
				value={title}
				onChange={e=> setProject({...project, title: e.target.value})}

			/>
			<textarea 
				className="form description-input"
				placeholder="Project Description"
				name="description" 
				value={description}
				onChange={e=> setProject({...project, description: e.target.value})}
			></textarea>
			<button onClick={handleSubmit} className="add-project-button">
				Add project <i className="fas fa-plus"></i>
			</button>
		</div>
	)
}

NewProjectForm.propTypes = {
	addProject: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
	project: state.project
})

export default connect(mapStateToProps, { addProject })(NewProjectForm);
