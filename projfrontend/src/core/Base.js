import React from 'react';
import Menu from './Menu';

function Base({
	title = 'My title',
	description = 'My description',
	className = 'bg-dark text-white p-4',
	children
}) {
	return (
		<div>
			<Menu />
			<div>
				<div className='bg-dark text-white text-center p-3'>
					<h2 className='display-4'>{title}</h2>
					<p className='lead'>{description}</p>
				</div>
				<div className={className}>{children}</div>
			</div>
			<footer className='footer bg-dark mt-auto'>
				<div className='container-fluid bg-success text-white text-center p-3'>
					<h4 className='py-2'>
						Best quality products, shipping all over the India
					</h4>
					<button className='btn btn-outline-light rounded btn-md mb-3'>
						Contact Us
					</button>
				</div>
				<div className='container text-center'>
					<span className='text-muted'>
						<span className='text-white'> MERN </span> stack E-commerce
						store
					</span>
				</div>
			</footer>
		</div>
	);
}

export default Base;
