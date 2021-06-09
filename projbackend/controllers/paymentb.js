const braintree = require('braintree');

const gateway = new braintree.BraintreeGateway({
	environment: braintree.Environment.Sandbox,
	merchantId: 's8d9kvnw2ymy4t8s',
	publicKey: 'tdrtp5yvs65rrv4j',
	privateKey: '3eb5e18d576e173d3e451d1939b4e5cd'
});

exports.getToken = (req, res) => {
	gateway.clientToken.generate({}, (err, response) => {
		// pass clientToken to your front-end
		if (err) {
			res.status(500).send(err);
		} else {
			res.send(response);
		}
	});
};

exports.processPayment = (req, res) => {
	let nonceFromTheClient = req.body.paymentMethodNonce;

	let amountFromTheClinet = req.body.amount;
	gateway.transaction.sale(
		{
			amount: '10.00',
			paymentMethodNonce: nonceFromTheClient,
			options: {
				submitForSettlement: true
			}
		},
		(err, result) => {
			if (err) {
				res.status(500).json(err);
			} else {
				res.json(result);
			}
		}
	);
};
