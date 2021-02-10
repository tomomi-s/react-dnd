import React from 'react'
import Header from './layout/Header';
import Projects from './project/Projects';
import NewProjectForm from './project/NewProjectForm'

const Home = () => {
	return (
		<div className="home">
			<Header />
			<Projects />
			<NewProjectForm />
		</div>
	)
}

export default Home