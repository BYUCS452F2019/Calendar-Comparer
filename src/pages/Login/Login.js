import React, {useState, useRef} from 'react';
import {useHistory} from 'react-router-dom'
import styles from './Login.module.css';

import TextInput from '../../components/TextInput/TextInput'
import Button from '../../components/Button/Button'

// Helper function
const makeAPICall = async (username, password)=>{
	// Replace with api call
	console.log(username, password)
	await new Promise(res=>setTimeout(res, 1000))

	return null
}

const Login = ({setUser})=>{
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const usernameRef = useRef()
	const passwordRef = useRef()
	const history = useHistory()

	const login = async ()=>{
		// Clear any current error message
		setError(null)

		// Set loading
		setLoading(true)

		const username = usernameRef.current.value
		const password = passwordRef.current.value

		try {
			const user = await makeAPICall(username, password)

			// Notify parent of user
			if(setUser && typeof setUser === 'function')
				setUser(user)

			// Navigate to calendar
			history.push('/calendar')

		// Handle errors with message, and clear loading state
		} catch (err) {
			setError(err.message)
			setLoading(false)
		}
	}

	return (
		<div className={styles.Login}>
			<h2>Login:</h2>
			<TextInput name="username" inputRef={usernameRef} />
			<TextInput name="password" inputRef={passwordRef} type="password" />
			<Button loading={loading} onClick={login}>Submit</Button>

			{error && (
				<div className={styles.Error}>
					{error}
				</div>
			)}
		</div>
	);
}

export default Login;
