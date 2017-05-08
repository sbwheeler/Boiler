import React from 'react';
import { browserHistory } from 'react-router';

// Auth component handles built-in login and signup
export default class Auth extends React.Component {
  constructor(props) {
    super(props);
    
    this.onSubmit = this.onSubmit.bind(this);
	}

  onSubmit () {
  
  }

	render () {
		return (
			<div>
				<div>
						<form onSubmit={this.onSubmit}>
								<div>
									<label>email</label>
									<input
										name="email" 
										type="email" 
										required 
									/>
								</div>
								<div>
										<label>password</label>
										<input 
										  name="password"
											type="password" 
											required 
										/>
								</div>
								<button type="submit">submit</button>
						</form>
				</div>
				<div>
					<div>
						<span>OR</span>
					</div>
				</div>
				<div>
					<p>
						<a target="_self"
							 href="/auth/google"
						<span>login with Google</span>
						</a>
					</p>
				</div>
			</div>
		);
	}
}

