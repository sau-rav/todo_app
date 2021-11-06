import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import useFetch from './useFetch'

const TodoDetails = () => {
	const { id } = useParams()
	const { data: todo, isPending, error } = useFetch('https://json-server-todo-238.herokuapp.com/todos' + id, '')
	const history = useHistory()

	const handleDelete = (id) => {
		fetch('https://json-server-todo-238.herokuapp.com/todos' + id, {
				method: 'DELETE',
			}).then(() => {
				history.push('/')
			})
	}

	return (
		<div className="todo-details">
			{ isPending && <div>Loading...</div> }
			{ error && <div>{ error }</div> }
			{ todo && (
				<article>
					<h1>{ todo.title }</h1>
					<p>Scheduled for { todo.date.split('-').reverse().join('-') }</p>
					<p className="todo_body">{ todo.body }</p>
					<button onClick={() => handleDelete(todo.id)}>Completed</button>
				</article>
			)}
		</div>
	)
}

export default TodoDetails
