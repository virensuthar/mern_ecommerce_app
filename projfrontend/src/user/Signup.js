import React, { useState } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { signup } from '../auth/helper';

function Signup() {
	const [values, setValues] = useState({
		name: '',
		email: '',
		password: '',
		error: '',
		success: false
	});

	const { name, email, password, error, success } = values;

	const handleChange = (name) => (event) => {
		setValues({
			...values,
			error: false,
			[name]: event.target.value
		});
	};

	const onSubmit = (event) => {
		event.preventDefault();
		setValues({
			...values,
			error: false
		});
		signup({ name, email, password })
			.then((data) => {
				if (data.error) {
					setValues({ ...values, error: data.error, success: false });
				} else {
					setValues({
						...values,
						name: '',
						email: '',
						password: '',
						error: '',
						success: true
					});
				}
			})
			.catch(console.log('Error in signup'));
	};

	const signupForm = () => {
		return (
			<div className='row'>
				<div className='col-md-4 offset-sm-4 text-left'>
					<form>
						<div className='form-group'>
							<label className='text-light'>Name</label>
							<input
								className='form-control'
								type='text'
								onChange={handleChange('name')}
								value={name}
							/>
						</div>
						<div className='form-group pt-2'>
							<label className='text-light'>Email</label>
							<input
								className='form-control'
								type='email'
								onChange={handleChange('email')}
								value={email}
							/>
						</div>
						<div className='form-group pt-2'>
							<label className='text-light'>Password</label>
							<input
								className='form-control'
								type='password'
								onChange={handleChange('password')}
								value={password}
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

	const successMessage = () => {
		return (
			<div className='row'>
				<div className='col-md-4 offset-sm-4 text-left'>
					<div
						className='alert alert-success'
						style={{ display: success ? '' : 'none' }}
					>
						New account was created successfully. please
						<Link to='/signin'>Login Here</Link>
					</div>
				</div>
			</div>
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

	return (
		<Base title='Signup Page' description='New here! create account here'>
			{successMessage()}
			{errorMessage()}
			{signupForm()}
			<p className='text-white text-center'>{JSON.stringify(values)}</p>
		</Base>
	);
}

export default Signup;
