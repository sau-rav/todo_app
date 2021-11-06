import { React, useState } from 'react'
import TodoList from './TodoList';
import useFetch from './useFetch';

const Home = () => {
	const [date, setDate] = useState('')
	const formatDate = (dateObj) => {
		var day = String(dateObj.getDate()).padStart(2, '0'),
		month = String(dateObj.getMonth() + 1).padStart(2, '0'),
		year = dateObj.getFullYear()
		return [year, month, day].join('-')
	}

	const { data: todos, isPending, error } = useFetch('https://json-server-todo-238.herokuapp.com/todos', date)

	return (
		<div className="home">
			{ todos &&
				<div className="home_header">
					<h2>All todos!</h2> 
					<span>
						<input
							type="date"
							min={ formatDate(new Date()) }
							value={ date }
							onChange={(e) => setDate(e.target.value)}
						>
						</input>
					</span>
				</div>
			}
			{ isPending && <div>Loading...</div> }
			{ error && <div>{ error }</div> }
			{ todos && <TodoList todos={ todos } /> }
		</div>
	);
}

export default Home
