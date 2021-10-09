import { useState, useEffect } from "react";

const useFetch = (url, date) => {
	const [data, setData] = useState(null);
	const [isPending, setIsPending] = useState(true);
	const [error, setError] = useState(null);
	
	useEffect(() => {
		const abortCont = new AbortController();

		fetch(url, { signal: abortCont.signal })
			.then(res => {
				if(!res.ok) {
					throw Error('Could not fetch data for that resource')
				}
				return res.json()
			})
			.then((data) => {
				if(date !== '') {
					var filtered_data = data.filter((entry) => { return entry.date === date })
					setData(filtered_data)
				} else {
					data.sort((e1, e2) => 
						e1.date.split('-').reverse().join('-') > e2.date.split('-').reverse().join('-'))
					setData(data)
				}
				setIsPending(false)
				setError(null)
			})
			.catch((err) => {
				if (err.name === 'AbortError') console.log('fetch aborted')
				else {
					setIsPending(false)
					setError(err.message)
				}
			})
		return () => abortCont.abort()
	}, [url, date]);

	return { data, isPending, error }
}

export default useFetch;