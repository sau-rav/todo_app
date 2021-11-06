import { React, useState } from 'react'
import { useHistory } from 'react-router-dom'

const Create = () => {
	const formatDate = (dateObj) => {
		var day = String(dateObj.getDate()).padStart(2, '0'),
		month = String(dateObj.getMonth() + 1).padStart(2, '0'),
		year = dateObj.getFullYear()
		return [year, month, day].join('-')
	}
	const todayDate = formatDate(new Date())

	const [title, setTitle] = useState('')
	const [body, setBody] = useState('')
	const [date, setDate] = useState(todayDate)
	const [isPending, setIsPending] = useState(false)
	const history = useHistory()

	const handleSubmit = (e) => {
		if(title.trim() === '') {
			alert('title cant be empty')
			return false
		}

		e.preventDefault();
		const blog = { title, body, date };
		setIsPending(true);

		fetch('https://json-server-todo-238.herokuapp.com/todos', {
			method: 'POST',
			headers: { "Content-type": "application/json" },
			body: JSON.stringify(blog)
		}).then(() => {
			setIsPending(false);
			history.push('/')
		})
	}

	return (
		<div className='create'>
			<h2>Add todo</h2>
			<form onSubmit={ handleSubmit }>
				<label>Title</label>
				<input 
					type="text" 
					required 
					value={ title }
					onChange={(e) => setTitle(e.target.value)}
				/>
				<label>Details</label>
				<textarea 
					required
					value={ body }
					onChange={(e) => setBody(e.target.value)} 
				></textarea>
				<label>Date</label>
				<input
					type="date"
					min={ todayDate }
					value={ date }
					onChange={(e) => setDate(e.target.value)}
				>
				</input>
				{ !isPending && <button>Add todo</button> }
				{ isPending && <button>Adding todo..</button>}
			</form>
		</div>
	)
}

export default Create
