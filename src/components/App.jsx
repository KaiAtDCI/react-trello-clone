import React from 'react'
import Project from "./Project";
import {projects} from "../data";
import './App.scss'

export default class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			projects: projects,
		};
	}

	addTask = (id, description) => {
		const newTask = {
			id: Math.round(Math.random() * 10000000),
			text: description,
		}
		const projects = [...this.state.projects];
		projects.find(project => project.id === id).tasks.push(newTask);
		this.setState({projects: projects})
	}

	deleteTask = (projectId, taskId) => {
		console.log('delete: ');
		const projects = [...this.state.projects];
		const tasks = projects.find(project => project.id === projectId).tasks;
		projects.find(project => project.id === projectId).tasks = tasks.filter(task => task.id !== taskId);
		this.setState({ projects: projects }, () => console.log(this.state.projects))
	}

	addProject = () => {
		const newProject = {
			id: Math.round(Math.random() * 1000000),
			title: '',
			tasks: [],
		}
		const projects = [...this.state.projects];
		projects.push(newProject);
		this.setState({projects: projects});
	}

	deleteProject = (id) => {
		const projects = this.state.projects.filter(project => project.id !== id);
		// console.log(projects);
		this.setState({ projects: projects });
	}

	render() {
		return (
			<div className='App'>
				<input type='button'
					   value='Add Project'
					   className='btn btn-primary'
					   onClick={this.addProject}/>
				<div className='projects'>
					{this.state.projects.map((project) =>
						<Project key={project.id}
								 project={project}
								 deleteProject={this.deleteProject}
								 addTask={this.addTask}
								 deleteTask={this.deleteTask}
						/>)}
				</div>
			</div>
		)
	}
}