import React, { useState } from 'react';
import Base from '../core/Base';
import { Redirect } from 'react-router-dom';
import { signin, authenticate, isAuthenticated } from '../auth/helper';

function Signin() {
	const [values, setValues] = useState({
		email: 'a@viren.com',
		password: '123456',
		error: '',
		loading: false,
		didRedirect: false
	});
	const { email, password, error, loading, didRedirect } = values;

	const { user } = isAuthenticated();

	const handleChange = (name) => (event) => {
		setValues({
			...values,
			error: false,
			[name]: event.target.value
		});
	};

	const onSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, error: false, loading: true });
		signin({ email, password })
			.then((data) => {
				if (data.error) {
					setValues({ ...values, error: data.error, loading: false });
				} else {
					authenticate(data, () => {
						setValues({
							...values,
							didRedirect: true
						});
					});
				}
			})
			.catch(console.log('signin request failed'));
	};

	const performRedirect = () => {
		if (didRedirect) {
			if (user && user.role === 1) {
				return <Redirect to='/admin/dashboard' />;
			} else {
				return <Redirect to='/user/dashboard' />;
			}
		}
		if (isAuthenticated()) {
			return <Redirect to='/' />;
		}
	};

	const loadingMessage = () => {
		return (
			loading && (
				<div className='alert alert-info'>
					<h2>Loading...</h2>
				</div>
			)
		);
	};

	const errorMessage = () => {
		return (
			<div className='row'>
				<div className='col-md-4 offset-sm-4 text-left'>
					<div
						className='alert alert-danger'
						style={{ display: error ? '' : 'none' }}
					>
						{error}
					</div>
				</div>
			</div>
		);
	};

	const signinForm = () => {
		return (
			<div className='row'>
				<div className='col-md-4 offset-sm-4 text-left'>
					<form>
						<div className='form-group'>
							<label className='text-light'>Email</label>
							<input
								className='form-control'
								value={email}
								type='email'
								onChange={handleChange('email')}
							/>
						</div>
						<div className='form-group pt-2'>
							<label className='text-light'>Password</label>
							<input
								className='form-control'
								value={password}
								type='password'
								onChange={handleChange('password')}
							/>
						</div>
						<button
							onClick={onSubmit}
							className='btn btn-success btn-block my-4 rounded'
						>
							Submit
						</button>
					</form>
				</div>
			</div>
		);
	};

	return (
		<Base title='Signin Page' description='Already user login here'>
			{loadingMessage()}
			{errorMessage()}
			{signinForm()}
			{performRedirect()}
			<p className='text-white text-center'>{JSON.stringify(values)}</p>
		</Base>
	);
}

export default Signin;
