import React from 'react'
import { Link } from 'react-router-dom'

const TodoList = ({ todos }) => {
	return (
		<div className="todo-list">
			{todos.map((todo) => (
				<div className="todo-preview" key={todo.id}>
					<Link to={ `/todos/${todo.id}` }>
						<h2>{ todo.title }</h2>
					    <p>Date : { todo.date.split('-').reverse().join('-') }</p>
					</Link>
				</div>
			))}
		</div>
	)
}

export default TodoList
