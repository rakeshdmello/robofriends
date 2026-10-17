import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './RoboApp.css';

export const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

class RoboApp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			robots: [],
			searchfield: '',
			loading: true,
			error: null
		};
	}

	componentDidMount() {
		this.loadRobots();
	}

	loadRobots = () => {
		this.setState({ loading: true, error: null });
		fetch(USERS_URL)
			.then(response => {
				if (!response.ok) {
					throw new Error(`Request failed with status ${response.status}`);
				}
				return response.json();
			})
			.then(users => this.setState({ robots: users, loading: false }))
			.catch(() => this.setState({
				loading: false,
				error: 'Could not load the robots. Check your internet connection and try again.'
			}));
	}

	onSearchChange = (event) => {
		this.setState({ searchfield: event.target.value });
	}

	render() {
		const { robots, searchfield, loading, error } = this.state;

		if (loading) {
			return <h1>Loading...</h1>;
		}

		if (error) {
			return (
				<div>
					<h1 className='f1'>RoboFriends</h1>
					<p className='white f4' role='alert'>{error}</p>
					<button className='pa2 ph3 br2 ba b--green bg-lightest-blue pointer' onClick={this.loadRobots}>
						Try again
					</button>
				</div>
			);
		}

		const search = searchfield.trim().toLowerCase();
		const filteredRobots = robots.filter(robot =>
			robot.name.toLowerCase().includes(search)
		);

		return (
			<div>
				<h1 className='f1'>RoboFriends</h1>
				<SearchBox searchChange={this.onSearchChange} />
				<Scroll>
					<ErrorBoundary>
						{filteredRobots.length > 0
							? <CardList robots={filteredRobots} />
							: <p className='white f4'>No robots match "{searchfield}".</p>}
					</ErrorBoundary>
				</Scroll>
			</div>
		);
	}
}

export default RoboApp;
