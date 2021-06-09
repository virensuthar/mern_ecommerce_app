import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/cartHelper';
import { createOrder } from './helper/orderHelper';
import { getmeToken, processPayment } from './helper/paymentbhelper';
import DropIn from 'braintree-web-drop-in-react';

function Paymentb({ products, setReload = (f) => f, reload = undefined }) {
	const [info, setInfo] = useState({
		loading: false,
		success: false,
		clientToken: null,
		error: '',
		instance: {}
	});

	const userId = isAuthenticated() && isAuthenticated().user._id;
	const token = isAuthenticated() && isAuthenticated().token;

	const getToken = (userId, token) => {
		getmeToken(userId, token).then((info) => {
			// console.log('Information', info);
			if (info.error) {
				setInfo({ ...info, error: info.error });
			} else {
				const clientToken = info.clientToken;
				setInfo({ clientToken });
			}
		});
	};

	const showbtdropIn = () => {
		return (
			<div>
				{info.clientToken !== null && products.length > 0 ? (
					<div>
						<DropIn
							options={{ authorization: info.clientToken }}
							onInstance={(instance) => (info.instance = instance)}
						/>
						<button
							className='btn btn-success btn-block'
							onClick={onPurchase}
						>
							Buy
						</button>
					</div>
				) : (
					<h3>Plesase login or add to cart</h3>
				)}
			</div>
		);
	};

	const onPurchase = () => {
		setInfo({ loading: true });
		let nonce;
		let getNonce = info.instance.requestPaymentMethod().then((data) => {
			nonce = data.nonce;
			const paymentData = {
				paymentMethodNonce: nonce,
				amount: getAmount()
			};
			processPayment(userId, token, paymentData)
				.then((res) => {
					setInfo({ ...info, success: res.success, loading: false });
					console.log('PAYMENT SUCCESS');
					const orderData = {
						products: products,
						transaction_id: res.transaction.id,
						amount: res.transaction.amount
					};
					createOrder(userId, token, orderData);
					cartEmpty(() => {
						console.log('did we got a crash?');
					});
					setReload(!reload);
				})
				.catch((error) => {
					setInfo({ loading: false, success: false });
					console.log('PAYMENT FAIED');
				});
		});
	};

	useEffect(() => {
		getToken(userId, token);
	}, []);

	const getAmount = () => {
		let amount = 0;
		products.map((p) => {
			amount = amount + p.price;
		});
		return amount;
	};

	return (
		<div>
			<h3>Your bill is {getAmount()}</h3>
			{showbtdropIn()}
		</div>
	);
}

export default Paymentb;
