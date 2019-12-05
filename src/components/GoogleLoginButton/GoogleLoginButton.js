import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import GoogleLogin from 'react-google-login';

import styles from './GoogleLoginButton.module.css'

// Helper function
const makeAPICall = async (googleResponse) => {
	axios.post('/api/login', {}, {
		headers: { Authorization: googleResponse.tokenId },
	}).then(res=>console.log(res.data))

	return null
}

const responseGoogle = (response) => {
	console.log(response);
}

const GoogleLoginButton = ({setUser})=>{
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const [loggedIn, setLoggedIn] = useState(false)
	const history = useHistory()

	const login = async (googleResponse)=>{
		// Clear any current error message
		setError(null)

		// Set loading
		setLoading(true)

		// Set loggedIn
		setLoggedIn(true)

		document.getElementById('googleButton')

		try {
			// const user = await makeAPICall(username, password)
			const user = await makeAPICall(googleResponse)

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

	if (!loggedIn) {
		return (
			<div>
				<GoogleLogin
					clientId="527738104479-b7jsh44hks41f8689otjraeinv7mj9im.apps.googleusercontent.com"
					buttonText="Sign In"
					onSuccess={login}
					onFailure={responseGoogle}
					cookiePolicy={'single_host_origin'}
				/>,
	
				{error && (
					<div className={styles.Error}>
						{error}
					</div>
				)}
			</div>
		);
	}
	return (
		<div>
				<GoogleLogin
					clientId="527738104479-b7jsh44hks41f8689otjraeinv7mj9im.apps.googleusercontent.com"
					buttonText="Sign Out"
					cookiePolicy={'single_host_origin'}
				/>,
	
				{error && (
					<div className={styles.Error}>
						{error}
					</div>
				)}
			</div>
	)
}

export default GoogleLoginButton
