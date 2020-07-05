import React, { Component }  from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './RoboApp.css';

class RoboApp extends Component {
	constructor() {
		super()
		this.state = {
			robots:[],
			searchfield:''
		}	
		console.log('constructor');
	}
	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
		  .then(response=> response.json())
		  .then(users=> this.setState({ robots : users }));	
		console.log('componentDidMount');
	}
	onSearchChange = (event) => {
		{/* Prints the value entered in search box */}
		this.setState({searchfield:event.target.value})
		console.log(event.target.value);
	}
	render() {
		const filteredRobots = this.state.robots.filter(robots =>{
			return robots.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
		});
		console.log('render');
		if(this.state.robots.length === 0) {
			return <h1>Loading...</h1>
		}else{
			return(
				<div>
					<h1 className='f1'>RoboFriends</h1>
					<SearchBox searchChange = {this.onSearchChange}/>
					<Scroll>
						<ErrorBoundary>
							<CardList robots={filteredRobots}/>
						</ErrorBoundary>
					</Scroll>
				</div>
			);
		}
	}
}
export default RoboApp;