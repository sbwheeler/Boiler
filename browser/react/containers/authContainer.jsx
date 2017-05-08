const mapStateLogin = () => ({ message: 'Log in' })
const mapDispatchLogin = dispatch => ({ 
	login: credentials => {
		dispatch(login(credentials));
		browserHistory.push('/');
	}
})

const mapStateSignup = () => ({ message: 'Sign up' })
const mapDispatchSignup = dispatch => ({ 
	signup: credentials => {
		dispatch(signup(credentials));
		browserHistory.push('/');
	}
})

e
