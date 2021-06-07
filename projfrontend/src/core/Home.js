import React, { useState, useEffect } from 'react';
import '../styles.css';
import Base from './Base';
import Card from './Card';
import { getProducts } from './helper/coreapicalls';

function Home() {
	const [porducts, setProducts] = useState([]);
	const [error, setError] = useState(false);

	const loadAllProduct = () => {
		getProducts().then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				setProducts(data);
			}
		});
	};

	useEffect(() => {
		loadAllProduct();
	}, []);

	return (
		<Base title='Home Page' description='Welcome to the tshirt store'>
			<div className='row text-center'>
				<h1 className='text-white'>All of tshirts</h1>
				<div className='row'>
					{porducts.map((product, index) => {
						return (
							<div className='col-4 mb-4' key={index}>
								<Card product={product} />
							</div>
						);
					})}
				</div>
			</div>
		</Base>
	);
}
export default Home;
