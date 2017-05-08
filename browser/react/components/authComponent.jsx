import React from 'react';
import { browserHistory } from 'react-router';

// Auth component handles built-in login and signup
export default class AuthComponent extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const credentials = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    this.props.login(credentials);
  }

  onLogoutClick() {
    this.props.logout();
  }

	render() {
		return (
      <div>
      { this.props.user ?
        (
          <button onClick={() => this.onLogoutClick()}>Log out</button>
        ) :
        (
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
      )
      }
    </div>
    );
  }
}

